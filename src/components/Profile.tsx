import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, User, Heart, Edit, FileText, Download, Save, X, Plus, Check, AlertCircle, Upload, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, setDoc, getDoc, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { WellnessMetrics } from "@/components/WellnessMetrics";
import { MentalHealthScore } from "@/components/MentalHealthScore";
import { HealthMetrics } from "./HealthMetrics";



export const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const storage = getStorage();
  
  // Documents State
  const [documents, setDocuments] = useState<Array<{
    id: string;
    name: string;
    url: string;
    uploadedAt: Date;
    size: number;
    type: string;
  }>>([]);
  
  // Personal Details State
  const [personalDetails, setPersonalDetails] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    languages: "",
    homeAddress: "",
    emergencyContact: "",
    emergencyPhone: "",
    occupation: "",
    education: "",
    maritalStatus: ""
  });

  // Health Metrics State - Physiological metrics only
  const [healthMetrics, setHealthMetrics] = useState({
    heartRate: "",
    hrv: "",
    eda: "",
    bvp: "",
    skinTemp: "",
    respirationRate: "",
    sleepREM: "",
    sleepDeep: "",
    sleepLight: "",
    movement: ""
  });

  const [dataCompletion, setDataCompletion] = useState({
    personalDetails: 0,
    healthMetrics: 0
  });

  // Calculate completion percentage
  const calculateCompletion = (data: Record<string, string>) => {
    const totalFields = Object.keys(data).length;
    const completedFields = Object.values(data).filter(value => value && typeof value === 'string' && value.trim() !== "").length;
    return Math.round((completedFields / totalFields) * 100);
  };

  // Load user documents from Firestore
  const loadUserDocuments = async () => {
    if (!user) return;
    
    try {
      const documentsRef = collection(db, "users", user.uid, "documents");
      const snapshot = await getDocs(documentsRef);
      const loadedDocs = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          url: data.url || '',
          uploadedAt: data.uploadedAt?.toDate() || new Date(),
          size: data.size || 0,
          type: data.type || ''
        };
      });
      setDocuments(loadedDocs);
    } catch (error) {
      console.error("Error loading documents:", error);
    }
  };

  // Load user data from Firestore
  useEffect(() => {
    const loadUserData = async () => {
      if (user?.uid) {
        try {
          // Load personal details
          const personalDoc = await getDoc(doc(db, "userProfiles", user.uid));
          if (personalDoc.exists()) {
            const personalData = personalDoc.data();
            setPersonalDetails(prev => ({
              ...prev,
              displayName: user?.displayName || personalData.displayName || "",
              email: user?.email || personalData.email || "",
              phone: user?.phoneNumber || personalData.phone || "",
              dateOfBirth: personalData.dateOfBirth || "",
              gender: personalData.gender || "",
              nationality: personalData.nationality || "",
              languages: personalData.languages || "",
              homeAddress: personalData.homeAddress || "",
              emergencyContact: personalData.emergencyContact || "",
              emergencyPhone: personalData.emergencyPhone || "",
              occupation: personalData.occupation || "",
              education: personalData.education || "",
              maritalStatus: personalData.maritalStatus || ""
            }));
          }

          // Load health metrics
          const healthDoc = await getDoc(doc(db, "userHealthMetrics", user.uid));
          if (healthDoc.exists()) {
            const healthData = healthDoc.data();
            setHealthMetrics(prev => ({
              ...prev,
              ...healthData
            }));
          }
          
          // Load user documents
          await loadUserDocuments();
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      }
    };

    loadUserData();
  }, [user, loadUserDocuments]);

  // Update completion percentages when data changes
  useEffect(() => {
    setDataCompletion({
      personalDetails: calculateCompletion(personalDetails),
      healthMetrics: calculateCompletion(healthMetrics)
    });
  }, [personalDetails, healthMetrics]);

  // Save personal details
  const savePersonalDetails = async () => {
    if (!user?.uid) return;
    setIsLoading(true);
    
    try {
      await setDoc(doc(db, "userProfiles", user.uid), {
        ...personalDetails,
        lastUpdated: new Date(),
        uid: user.uid
      }, { merge: true });
      
      alert("Personal details saved successfully!");
    } catch (error) {
      console.error("Error saving personal details:", error);
      alert("Failed to save personal details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Save health metrics
  const saveHealthMetrics = async () => {
    if (!user?.uid) return;
    setIsLoading(true);
    
    try {
      await setDoc(doc(db, "userHealthMetrics", user.uid), {
        ...healthMetrics,
        lastUpdated: new Date(),
        uid: user.uid
      }, { merge: true });
      
      alert("Health metrics saved successfully!");
    } catch (error) {
      console.error("Error saving health metrics:", error);
      alert("Failed to save health metrics. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Upload document
  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload PDF, image, text, or Word documents only");
      return;
    }

    setUploadingDocument(true);
    try {
      // Upload file to Firebase Storage
      const fileRef = ref(storage, `users/${user.uid}/documents/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Save document metadata to Firestore
      const docData = {
        name: file.name,
        url: downloadURL,
        uploadedAt: new Date(),
        size: file.size,
        type: file.type
      };

      await addDoc(collection(db, "users", user.uid, "documents"), docData);
      
      // Refresh documents list
      await loadUserDocuments();
      
      alert("Document uploaded successfully!");
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("Failed to upload document. Please try again.");
    } finally {
      setUploadingDocument(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Delete document
  const handleDeleteDocument = async (docId: string, docUrl: string) => {
    if (!user || !confirm("Are you sure you want to delete this document?")) return;

    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "users", user.uid, "documents", docId));
      
      // Delete from Storage
      const fileRef = ref(storage, docUrl);
      await deleteObject(fileRef);
      
      // Refresh documents list
      await loadUserDocuments();
      
      alert("Document deleted successfully!");
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete document. Please try again.");
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Loading state while checking authentication
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h1>
          <p className="text-gray-600">You need to be authenticated to access profile settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="ALL IN A Logo" 
            className="w-10 h-10 object-contain mr-3" 
          />
          <h1 className="text-3xl font-bold text-gray-900">ALL IN A Profile</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.displayName || "User"} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-green-500 flex items-center justify-center text-white font-semibold">
                {(user?.displayName || user?.email || "U").charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Data Completion Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className={`${dataCompletion.personalDetails < 70 ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              {dataCompletion.personalDetails < 70 ? (
                <AlertTriangle className="w-8 h-8 text-red-500" />
              ) : (
                <Check className="w-8 h-8 text-green-500" />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Personal Details</h3>
                <p className={`text-sm ${dataCompletion.personalDetails < 70 ? 'text-red-600' : 'text-green-600'}`}>
                  {dataCompletion.personalDetails}% Complete
                  {dataCompletion.personalDetails < 70 && " - Please complete your profile"}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('personal')}
                className={dataCompletion.personalDetails < 70 ? 'border-red-300 text-red-700 hover:bg-red-50' : 'border-green-300 text-green-700 hover:bg-green-50'}
              >
                {dataCompletion.personalDetails < 70 ? 'Complete' : 'View'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className={`${dataCompletion.healthMetrics < 70 ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              {dataCompletion.healthMetrics < 70 ? (
                <AlertTriangle className="w-8 h-8 text-red-500" />
              ) : (
                <Check className="w-8 h-8 text-green-500" />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Physiological Metrics</h3>
                <p className={`text-sm ${dataCompletion.healthMetrics < 70 ? 'text-red-600' : 'text-green-600'}`}>
                  {dataCompletion.healthMetrics}% Complete
                  {dataCompletion.healthMetrics < 70 && " - Please complete your physiological data"}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('health')}
                className={dataCompletion.healthMetrics < 70 ? 'border-red-300 text-red-700 hover:bg-red-50' : 'border-green-300 text-green-700 hover:bg-green-50'}
              >
                {dataCompletion.healthMetrics < 70 ? 'Complete' : 'View'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: User },
          { id: 'personal', label: 'Personal Details', icon: Edit },
          { id: 'health', label: 'Physiological Metrics', icon: Heart }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-green-600" />
                <span>Profile Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || "User"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                      {(personalDetails.displayName || user?.email || "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{personalDetails.displayName || "Complete your profile"}</h3>
                  <p className="text-gray-600">{personalDetails.email}</p>
                  <p className="text-sm text-gray-500">{personalDetails.occupation || "Occupation not specified"}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{dataCompletion.personalDetails}%</p>
                  <p className="text-sm text-gray-600">Personal Details</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{dataCompletion.healthMetrics}%</p>
                  <p className="text-sm text-gray-600">Physiological Metrics</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{personalDetails.languages ? personalDetails.languages.split(',').length : 0}</p>
                  <p className="text-sm text-gray-600">Languages</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{documents.length}</p>
                  <p className="text-sm text-gray-600">Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mental Health Score */}
          <MentalHealthScore />

          {/* Health Metrics */}
          <HealthMetrics />

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span>Documents</span>
                </div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingDocument}
                  className="bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  {uploadingDocument ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Document
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleDocumentUpload}
                style={{ display: 'none' }}
              />
              
              {documents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No documents uploaded yet</p>
                  <p className="text-sm">Click "Upload Document" to add your first document</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(doc.size)} • {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(doc.url, '_blank')}
                          title="View document"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDocument(doc.id, doc.name)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Delete document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Personal Details Form */}
      {activeTab === 'personal' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Edit className="w-5 h-5 text-green-600" />
              <span>Personal Details Form</span>
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Complete your personal information to help us provide better personalized care.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="displayName" className="text-sm font-medium text-gray-700">
                    Full Name *
                  </Label>
                  <Input
                    id="displayName"
                    value={personalDetails.displayName}
                    onChange={(e) => setPersonalDetails({...personalDetails, displayName: e.target.value})}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalDetails.email}
                    onChange={(e) => setPersonalDetails({...personalDetails, email: e.target.value})}
                    placeholder="Enter your email address"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={personalDetails.phone}
                    onChange={(e) => setPersonalDetails({...personalDetails, phone: e.target.value})}
                    placeholder="Enter your phone number"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={personalDetails.dateOfBirth}
                    onChange={(e) => setPersonalDetails({...personalDetails, dateOfBirth: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                    Gender
                  </Label>
                  <Select value={personalDetails.gender} onValueChange={(value) => setPersonalDetails({...personalDetails, gender: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="nationality" className="text-sm font-medium text-gray-700">
                    Nationality
                  </Label>
                  <Input
                    id="nationality"
                    value={personalDetails.nationality}
                    onChange={(e) => setPersonalDetails({...personalDetails, nationality: e.target.value})}
                    placeholder="Enter your nationality"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="languages" className="text-sm font-medium text-gray-700">
                    Languages Spoken
                  </Label>
                  <Input
                    id="languages"
                    value={personalDetails.languages}
                    onChange={(e) => setPersonalDetails({...personalDetails, languages: e.target.value})}
                    placeholder="e.g., English, Spanish, French"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="homeAddress" className="text-sm font-medium text-gray-700">
                    Home Address
                  </Label>
                  <Textarea
                    id="homeAddress"
                    value={personalDetails.homeAddress}
                    onChange={(e) => setPersonalDetails({...personalDetails, homeAddress: e.target.value})}
                    placeholder="Enter your home address"
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="occupation" className="text-sm font-medium text-gray-700">
                    Occupation
                  </Label>
                  <Input
                    id="occupation"
                    value={personalDetails.occupation}
                    onChange={(e) => setPersonalDetails({...personalDetails, occupation: e.target.value})}
                    placeholder="Enter your occupation"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="education" className="text-sm font-medium text-gray-700">
                    Education Level
                  </Label>
                  <Select value={personalDetails.education} onValueChange={(value) => setPersonalDetails({...personalDetails, education: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="some-college">Some College</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="doctorate">Doctorate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="maritalStatus" className="text-sm font-medium text-gray-700">
                    Marital Status
                  </Label>
                  <Select value={personalDetails.maritalStatus} onValueChange={(value) => setPersonalDetails({...personalDetails, maritalStatus: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your marital status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                      <SelectItem value="separated">Separated</SelectItem>
                      <SelectItem value="in-relationship">In a Relationship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="emergencyContact" className="text-sm font-medium text-gray-700">
                    Emergency Contact Name
                  </Label>
                  <Input
                    id="emergencyContact"
                    value={personalDetails.emergencyContact}
                    onChange={(e) => setPersonalDetails({...personalDetails, emergencyContact: e.target.value})}
                    placeholder="Enter emergency contact name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyPhone" className="text-sm font-medium text-gray-700">
                    Emergency Contact Phone
                  </Label>
                  <Input
                    id="emergencyPhone"
                    value={personalDetails.emergencyPhone}
                    onChange={(e) => setPersonalDetails({...personalDetails, emergencyPhone: e.target.value})}
                    placeholder="Enter emergency contact phone"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t">
              <Button 
                onClick={savePersonalDetails} 
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
              >
                {isLoading ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Personal Details</span>
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Health Metrics Form */}
      {activeTab === 'health' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-green-600" />
              <span>Physiological Health Metrics</span>
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Enter your recent physiological health data. These values help us better understand your overall health status and provide personalized recommendations.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="heartRate" className="text-sm font-medium text-gray-700">
                    Heart Rate (bpm)
                  </Label>
                  <Input
                    id="heartRate"
                    type="number"
                    value={healthMetrics.heartRate}
                    onChange={(e) => setHealthMetrics({...healthMetrics, heartRate: e.target.value})}
                    placeholder="e.g., 72 (Normal: 60-100 bpm)"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Beats per minute - Normal range: 60-100 bpm</p>
                </div>

                <div>
                  <Label htmlFor="hrv" className="text-sm font-medium text-gray-700">
                    Heart Rate Variability (ms)
                  </Label>
                  <Input
                    id="hrv"
                    type="number"
                    value={healthMetrics.hrv}
                    onChange={(e) => setHealthMetrics({...healthMetrics, hrv: e.target.value})}
                    placeholder="e.g., 45 (Good: 30-70 ms)"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Milliseconds - Higher values indicate better stress recovery</p>
                </div>

                <div>
                  <Label htmlFor="eda" className="text-sm font-medium text-gray-700">
                    EDA/GSR (μS)
                  </Label>
                  <Input
                    id="eda"
                    type="number"
                    step="0.1"
                    value={healthMetrics.eda}
                    onChange={(e) => setHealthMetrics({...healthMetrics, eda: e.target.value})}
                    placeholder="e.g., 2.3 (Normal: 1-5 μS)"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Electrodermal Activity in microsiemens - Measures stress response</p>
                </div>

                <div>
                  <Label htmlFor="bvp" className="text-sm font-medium text-gray-700">
                    BVP/PPG (V)
                  </Label>
                  <Input
                    id="bvp"
                    type="number"
                    step="0.1"
                    value={healthMetrics.bvp}
                    onChange={(e) => setHealthMetrics({...healthMetrics, bvp: e.target.value})}
                    placeholder="e.g., 1.2 (Typical: 0.5-2.0 V)"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Blood Volume Pulse in volts - Measures blood flow</p>
                </div>

                <div>
                  <Label htmlFor="skinTemp" className="text-sm font-medium text-gray-700">
                    Skin Temperature (°C)
                  </Label>
                  <Input
                    id="skinTemp"
                    type="number"
                    step="0.1"
                    value={healthMetrics.skinTemp}
                    onChange={(e) => setHealthMetrics({...healthMetrics, skinTemp: e.target.value})}
                    placeholder="e.g., 32.5 (Normal: 30-35°C)"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Degrees Celsius - Normal skin temperature range</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="respirationRate" className="text-sm font-medium text-gray-700">
                    Respiration Rate (bpm)
                  </Label>
                  <Input
                    id="respirationRate"
                    type="number"
                    value={healthMetrics.respirationRate}
                    onChange={(e) => setHealthMetrics({...healthMetrics, respirationRate: e.target.value})}
                    placeholder="e.g., 16 (Normal: 12-20 bpm)"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Breaths per minute - Normal range: 12-20 bpm</p>
                </div>

                <div>
                  <Label htmlFor="sleepREM" className="text-sm font-medium text-gray-700">
                    REM Sleep (%)
                  </Label>
                  <Input
                    id="sleepREM"
                    type="number"
                    value={healthMetrics.sleepREM}
                    onChange={(e) => setHealthMetrics({...healthMetrics, sleepREM: e.target.value})}
                    placeholder="e.g., 22 (Healthy: 20-25%)"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Percentage of total sleep - Healthy range: 20-25%</p>
                </div>

                <div>
                  <Label htmlFor="sleepDeep" className="text-sm font-medium text-gray-700">
                    Deep Sleep (%)
                  </Label>
                  <Input
                    id="sleepDeep"
                    type="number"
                    value={healthMetrics.sleepDeep}
                    onChange={(e) => setHealthMetrics({...healthMetrics, sleepDeep: e.target.value})}
                    placeholder="e.g., 18 (Healthy: 15-20%)"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Percentage of total sleep - Healthy range: 15-20%</p>
                </div>

                <div>
                  <Label htmlFor="sleepLight" className="text-sm font-medium text-gray-700">
                    Light Sleep (%)
                  </Label>
                  <Input
                    id="sleepLight"
                    type="number"
                    value={healthMetrics.sleepLight}
                    onChange={(e) => setHealthMetrics({...healthMetrics, sleepLight: e.target.value})}
                    placeholder="e.g., 60 (Typical: 55-65%)"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Percentage of total sleep - Typical range: 55-65%</p>
                </div>

                <div>
                  <Label htmlFor="movement" className="text-sm font-medium text-gray-700">
                    Daily Movement (steps)
                  </Label>
                  <Input
                    id="movement"
                    type="number"
                    value={healthMetrics.movement}
                    onChange={(e) => setHealthMetrics({...healthMetrics, movement: e.target.value})}
                    placeholder="e.g., 7200 (Goal: 8000-10000 steps)"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Steps per day - Recommended: 8000-10000 steps daily</p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t">
              <Button 
                onClick={saveHealthMetrics} 
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
              >
                {isLoading ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Physiological Metrics</span>
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
