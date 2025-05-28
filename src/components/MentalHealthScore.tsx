
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, AlertCircle, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EPDSQuiz } from "./EPDSQuiz";

interface MentalHealthScoreProps {
  showTitle?: boolean;
  epdsScore?: number;
  epdsAnswers?: number[];
}

export const MentalHealthScore = ({ showTitle = true, epdsScore, epdsAnswers }: MentalHealthScoreProps) => {
  const [showEPDSQuiz, setShowEPDSQuiz] = useState(false);
  const [currentEPDSScore, setCurrentEPDSScore] = useState(epdsScore);
  const [lastAssessmentDate, setLastAssessmentDate] = useState<Date | null>(
    epdsScore ? new Date() : null
  );

  // Calculate mental health score based on EPDS results
  const calculateMentalHealthScore = (epdsScore?: number) => {
    if (!epdsScore && epdsScore !== 0) {
      return 75; // Default score when no EPDS taken
    }
    
    // Convert EPDS score (0-30, higher is worse) to mental health score (0-100, higher is better)
    // EPDS: 0-9 = low risk, 10-12 = moderate, 13+ = high risk
    if (epdsScore <= 9) {
      return 85 - (epdsScore * 2); // 85-67 range (good to excellent)
    } else if (epdsScore <= 12) {
      return 67 - ((epdsScore - 9) * 5); // 67-52 range (fair to good)
    } else {
      return Math.max(20, 52 - ((epdsScore - 12) * 3)); // 52-20 range (needs attention)
    }
  };

  const mentalHealthScore = calculateMentalHealthScore(currentEPDSScore);
  const handleEPDSComplete = (score: number, answers: number[]) => {
    setCurrentEPDSScore(score);
    setLastAssessmentDate(new Date());
    setShowEPDSQuiz(false);
  };

  const handleBookingNavigation = () => {
    // Navigate to booking section - you can customize this based on your routing setup
    const bookingSection = document.getElementById('therapist-booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If no booking section on current page, navigate to booking page
      window.location.href = '/booking';
    }
  };

  if (showEPDSQuiz) {
    return <EPDSQuiz onComplete={handleEPDSComplete} />;
  }
  
  const getScoreStatus = (score: number) => {
    if (score >= 80) return { status: "Excellent", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" };
    if (score >= 60) return { status: "Good", color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" };
    if (score >= 40) return { status: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" };
    return { status: "Needs Attention", color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" };
  };

  const scoreInfo = getScoreStatus(mentalHealthScore);

  return (
    <Card className={`${scoreInfo.bgColor} ${scoreInfo.borderColor} border-2`}>
      {showTitle && (
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className={`w-5 h-5 ${scoreInfo.color}`} />
            <span>Stability Mental Health Score</span>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={!showTitle ? "pt-6" : ""}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{mentalHealthScore}/100</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${scoreInfo.color} ${scoreInfo.bgColor}`}>
              {scoreInfo.status}
            </span>
          </div>
          
          <Progress value={mentalHealthScore} className="h-3" />
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="font-medium">Last Assessment</span>
              </div>
              <p className="text-gray-600">
                {lastAssessmentDate ? lastAssessmentDate.toLocaleDateString() : "No assessment taken"}
              </p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <AlertCircle className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Trend</span>
              </div>
              <p className="text-gray-600">
                {currentEPDSScore !== undefined ? 
                  (currentEPDSScore <= 9 ? "Stable" : currentEPDSScore <= 12 ? "Monitor" : "Attention needed") : 
                  "Not assessed"
                }
              </p>
            </div>
          </div>
            <div className="p-3 bg-white/70 rounded-lg">
            <p className="text-sm text-gray-700">
              {currentEPDSScore !== undefined ? 
                `Based on your recent EPDS assessment (Score: ${currentEPDSScore}/30). ` : 
                "Take an EPDS assessment to get personalized insights. "
              }
              {mentalHealthScore >= 70 ? " You're doing well! Keep up the good self-care." : 
               mentalHealthScore >= 50 ? " Consider speaking with a healthcare provider." : 
               " We recommend reaching out to a mental health professional."}
            </p>
          </div>

          {/* Booking Button - shows when EPDS suggests speaking with healthcare provider */}
          {currentEPDSScore !== undefined && currentEPDSScore >= 10 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800 mb-1">
                    Professional Support Recommended
                  </p>
                  <p className="text-xs text-blue-600">
                    Consider booking an appointment with a healthcare provider
                  </p>
                </div>
                <Button
                  onClick={handleBookingNavigation}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          )}

          {/* EPDS Quiz Button */}
          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={() => setShowEPDSQuiz(true)}
              variant="outline"
              className="w-full border-green-200 text-green-700 hover:bg-green-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              {currentEPDSScore !== undefined ? "Retake EPDS Assessment" : "Take EPDS Assessment"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};