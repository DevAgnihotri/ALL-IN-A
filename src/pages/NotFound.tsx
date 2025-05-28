import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, Heart } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/logo.png" 
              alt="ALL IN A Logo" 
              className="w-20 h-20 object-contain mx-auto mb-4 drop-shadow-lg"
            />
          </div>

          {/* 404 Animation */}
          <div className="mb-6">
            <div className="text-8xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 animate-pulse">
              404
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-3">
              Oops! Page Not Found
            </h1>
            <p className="text-gray-600 leading-relaxed">
              The page you're looking for seems to have wandered off. 
              Don't worry, even the best explorers sometimes take wrong turns.
            </p>
            {location.pathname !== "/" && (
              <p className="text-sm text-gray-500 mt-2 font-mono bg-gray-100 px-3 py-1 rounded inline-block">
                {location.pathname}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleGoHome}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
            
            <Button 
              onClick={handleGoBack}
              variant="outline"
              className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Need help? Try these popular pages:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/courses")}
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                <Search className="w-3 h-3 mr-1" />
                Courses
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/profile")}
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                <Heart className="w-3 h-3 mr-1" />
                Wellness
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
