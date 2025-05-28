import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Video, Phone, CheckCircle, MessageSquare, Download } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { BookingService, BookingRecord } from "@/lib/bookingService";

interface BookingDetails {
  therapist: Therapist;
  date: Date;
  time: string;
  sessionType: string;
}

interface Therapist {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  image: string;
  nextAvailable: string;
  sessionTypes: string[];
  bio: string;
  availableTimes?: string[];
}

interface BookingConfirmationProps {
  therapist: Therapist;
  bookingDetails?: BookingDetails;
  onBack: () => void;
  onBookingComplete?: () => void;
}

export const BookingConfirmation = ({ therapist, bookingDetails: providedBookingDetails, onBack, onBookingComplete }: BookingConfirmationProps) => {
  const { user } = useAuth();
  const [userBookings, setUserBookings] = useState<BookingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Use provided booking details or create mock details if not provided
  const bookingDetails = providedBookingDetails || {
    therapist: therapist,
    date: new Date(),
    time: "2:00 PM",
    sessionType: "Video",
  };

  const loadUserBookings = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const bookings = await BookingService.getUserBookings(user.uid);
      setUserBookings(bookings);
    } catch (error) {
      console.error("Error loading user bookings:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadUserBookings();
  }, [loadUserBookings]);

  // Format date and time for display
  const bookingDate = format(bookingDetails.date, "EEEE, MMMM d, yyyy");
  
  // Get session icon
  const getSessionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'chat':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  // Helper function to download an .ics calendar file
  const downloadIcsFile = () => {
    const sessionDate = new Date(bookingDetails.date);
    const [time, period] = bookingDetails.time.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : (period === 'AM' && hours === 12 ? 0 : hours);
    
    sessionDate.setHours(adjustedHours);
    sessionDate.setMinutes(minutes || 0);
    
    const endDate = new Date(sessionDate);
    endDate.setMinutes(sessionDate.getMinutes() + 50); // 50-minute session
    
    // Format dates for iCalendar
    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const eventTitle = `Therapy Session with ${therapist.name}`;
    const eventDescription = `${bookingDetails.sessionType} session with ${therapist.name} (${therapist.specialty}).\\n\\n${therapist.bio}\\n\\nSession Details:\\n- Type: ${bookingDetails.sessionType}\\n- Date: ${bookingDate}\\n- Time: ${bookingDetails.time}`;
    
    // Create iCalendar content
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SereneSelf//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${eventTitle}`,
      `DESCRIPTION:${eventDescription}`,
      `DTSTART:${formatICSDate(sessionDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    // Create and trigger download
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `therapy-session-${format(bookingDetails.date, 'yyyy-MM-dd')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Button 
        onClick={onBack}
        variant="outline" 
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="space-y-6">
        {/* Success Message */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>              <div>
                <h3 className="text-lg font-semibold text-green-800">ALL&nbsp;IN&nbsp;A Booking Confirmed!</h3>
                <p className="text-green-600">Your ALL&nbsp;IN&nbsp;A therapy session has been successfully scheduled.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Session Details</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Therapist Info */}
            <div className="flex items-center space-x-4">
              <img 
                src={therapist.image} 
                alt={therapist.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{therapist.name}</h3>
                <p className="text-gray-600">{therapist.specialty}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(therapist.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({therapist.rating})</span>
                </div>
              </div>
            </div>

            {/* Session Info */}
            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-gray-600">{bookingDate}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-gray-600">{bookingDetails.time}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {getSessionIcon(bookingDetails.sessionType)}
                <div>
                  <p className="font-medium">Session Type</p>
                  <Badge variant="secondary">{bookingDetails.sessionType}</Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">Status</p>
                  <p className="text-green-600">Confirmed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Next Steps</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-gray-600">
                Your session is confirmed! Here's what you can do:
              </p>
              
              <Button 
                onClick={downloadIcsFile}
                variant="outline" 
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Add to Calendar (.ics)
              </Button>
              
              <div className="text-sm text-gray-500 space-y-1">
                <p>• You'll receive a confirmation email shortly</p>
                <p>• Session link will be provided before your appointment</p>
                <p>• Please join 5 minutes early</p>
                <p>• You can reschedule up to 24 hours before the session</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Bookings Summary */}
        {user && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Your Booking Summary</h3>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-gray-500">Loading your bookings...</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Total confirmed bookings: <span className="font-medium">{userBookings.length}/5</span>
                  </p>
                  {userBookings.length >= 4 && (
                    <p className="text-sm text-amber-600">
                      {userBookings.length === 5 
                        ? "You've reached the maximum booking limit. Cancel an existing booking to make a new one."
                        : "You have 1 booking slot remaining."
                      }
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
