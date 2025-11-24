import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Welcome = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-12">
        {/* Welcome Section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to<br />think.
          </h1>
          
          <div className="space-y-4 text-foreground">
            <p className="text-lg">
              We are here to help you get off of your phone.
            </p>
            
            <p className="text-lg">
              Let's start by getting to know each other!
            </p>
          </div>
        </div>

        {/* Account Selection */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Have you used think. before?
          </h2>
          
          <div className="space-y-3">
            <Button
              onClick={() => navigate("/auth?mode=login")}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              size="lg"
            >
              Yes, I have an account.
            </Button>
            
            <Button
              onClick={() => navigate("/auth?mode=signup")}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              size="lg"
            >
              No, I am excited to start!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
