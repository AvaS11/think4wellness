import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChevronLeft, Brain, Heart, Activity, Smartphone } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";

type QuestionnaireType = "anxiety" | "depression" | "focus" | "phone-habits";

interface Question {
  id: string;
  text: string;
  options: { value: string; label: string }[];
}

const questionnaireData: Record<QuestionnaireType, { title: string; icon: any; color: string; questions: Question[] }> = {
  anxiety: {
    title: "Anxiety Check-in (GAD-7)",
    icon: Heart,
    color: "text-primary",
    questions: [
      {
        id: "1",
        text: "Feeling nervous, anxious, or on edge",
        options: [
          { value: "0", label: "Not at all" },
          { value: "1", label: "Several days" },
          { value: "2", label: "More than half the days" },
          { value: "3", label: "Nearly every day" }
        ]
      },
      {
        id: "2",
        text: "Not being able to stop or control worrying",
        options: [
          { value: "0", label: "Not at all" },
          { value: "1", label: "Several days" },
          { value: "2", label: "More than half the days" },
          { value: "3", label: "Nearly every day" }
        ]
      },
      {
        id: "3",
        text: "Worrying too much about different things",
        options: [
          { value: "0", label: "Not at all" },
          { value: "1", label: "Several days" },
          { value: "2", label: "More than half the days" },
          { value: "3", label: "Nearly every day" }
        ]
      },
      {
        id: "4",
        text: "Trouble relaxing",
        options: [
          { value: "0", label: "Not at all" },
          { value: "1", label: "Several days" },
          { value: "2", label: "More than half the days" },
          { value: "3", label: "Nearly every day" }
        ]
      },
      {
        id: "5",
        text: "Being so restless that it's hard to sit still",
        options: [
          { value: "0", label: "Not at all" },
          { value: "1", label: "Several days" },
          { value: "2", label: "More than half the days" },
          { value: "3", label: "Nearly every day" }
        ]
      },
      {
        id: "6",
        text: "Becoming easily annoyed or irritable",
        options: [
          { value: "0", label: "Not at all" },
          { value: "1", label: "Several days" },
          { value: "2", label: "More than half the days" },
          { value: "3", label: "Nearly every day" }
        ]
      },
      {
        id: "7",
        text: "Feeling afraid as if something awful might happen",
        options: [
          { value: "0", label: "Not at all" },
          { value: "1", label: "Several days" },
          { value: "2", label: "More than half the days" },
          { value: "3", label: "Nearly every day" }
        ]
      }
    ]
  },
  depression: {
    title: "Depression Check-in (Beck Depression Inventory)",
    icon: Brain,
    color: "text-secondary",
    questions: [
      {
        id: "1",
        text: "Sadness",
        options: [
          { value: "0", label: "I do not feel sad" },
          { value: "1", label: "I feel sad much of the time" },
          { value: "2", label: "I am sad all the time" },
          { value: "3", label: "I am so sad that I can't stand it" }
        ]
      },
      {
        id: "2",
        text: "Pessimism",
        options: [
          { value: "0", label: "I am not discouraged about my future" },
          { value: "1", label: "I feel more discouraged about my future" },
          { value: "2", label: "I do not expect things to work out" },
          { value: "3", label: "I feel my future is hopeless" }
        ]
      },
      {
        id: "3",
        text: "Past Failure",
        options: [
          { value: "0", label: "I do not feel like a failure" },
          { value: "1", label: "I have failed more than I should have" },
          { value: "2", label: "I see a lot of failures" },
          { value: "3", label: "I feel I am a total failure" }
        ]
      },
      {
        id: "4",
        text: "Loss of Pleasure",
        options: [
          { value: "0", label: "I get as much pleasure as I ever did" },
          { value: "1", label: "I don't enjoy things as much" },
          { value: "2", label: "I get very little pleasure" },
          { value: "3", label: "I can't get any pleasure" }
        ]
      },
      {
        id: "5",
        text: "Guilty Feelings",
        options: [
          { value: "0", label: "I don't feel particularly guilty" },
          { value: "1", label: "I feel guilty over many things" },
          { value: "2", label: "I feel quite guilty most of the time" },
          { value: "3", label: "I feel guilty all of the time" }
        ]
      },
      {
        id: "6",
        text: "Punishment Feelings",
        options: [
          { value: "0", label: "I don't feel I am being punished" },
          { value: "1", label: "I feel I may be punished" },
          { value: "2", label: "I expect to be punished" },
          { value: "3", label: "I feel I am being punished" }
        ]
      },
      {
        id: "7",
        text: "Self-Dislike",
        options: [
          { value: "0", label: "I feel the same about myself" },
          { value: "1", label: "I have lost confidence in myself" },
          { value: "2", label: "I am disappointed in myself" },
          { value: "3", label: "I dislike myself" }
        ]
      }
    ]
  },
  focus: {
    title: "Focus Check-in (Adult Self-Report Scale)",
    icon: Activity,
    color: "text-accent",
    questions: [
      {
        id: "1",
        text: "How often do you have trouble wrapping up the final details of a project?",
        options: [
          { value: "0", label: "Never" },
          { value: "1", label: "Rarely" },
          { value: "2", label: "Sometimes" },
          { value: "3", label: "Often" },
          { value: "4", label: "Very Often" }
        ]
      },
      {
        id: "2",
        text: "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
        options: [
          { value: "0", label: "Never" },
          { value: "1", label: "Rarely" },
          { value: "2", label: "Sometimes" },
          { value: "3", label: "Often" },
          { value: "4", label: "Very Often" }
        ]
      },
      {
        id: "3",
        text: "How often do you have problems remembering appointments or obligations?",
        options: [
          { value: "0", label: "Never" },
          { value: "1", label: "Rarely" },
          { value: "2", label: "Sometimes" },
          { value: "3", label: "Often" },
          { value: "4", label: "Very Often" }
        ]
      },
      {
        id: "4",
        text: "How often do you avoid or delay getting started when you have a task that requires a lot of thought?",
        options: [
          { value: "0", label: "Never" },
          { value: "1", label: "Rarely" },
          { value: "2", label: "Sometimes" },
          { value: "3", label: "Often" },
          { value: "4", label: "Very Often" }
        ]
      },
      {
        id: "5",
        text: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
        options: [
          { value: "0", label: "Never" },
          { value: "1", label: "Rarely" },
          { value: "2", label: "Sometimes" },
          { value: "3", label: "Often" },
          { value: "4", label: "Very Often" }
        ]
      },
      {
        id: "6",
        text: "How often do you feel overly active and compelled to do things?",
        options: [
          { value: "0", label: "Never" },
          { value: "1", label: "Rarely" },
          { value: "2", label: "Sometimes" },
          { value: "3", label: "Often" },
          { value: "4", label: "Very Often" }
        ]
      },
      {
        id: "7",
        text: "How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?",
        options: [
          { value: "0", label: "Never" },
          { value: "1", label: "Rarely" },
          { value: "2", label: "Sometimes" },
          { value: "3", label: "Often" },
          { value: "4", label: "Very Often" }
        ]
      }
    ]
  },
  "phone-habits": {
    title: "Phone Habits Check-in",
    icon: Smartphone,
    color: "text-foreground",
    questions: [
      {
        id: "1",
        text: "How often do you check your phone within 5 minutes of waking up?",
        options: [
          { value: "0", label: "Never" },
          { value: "1", label: "Rarely" },
          { value: "2", label: "Sometimes" },
          { value: "3", label: "Often" },
          { value: "4", label: "Always" }
        ]
      },
      {
        id: "2",
        text: "How often do you feel anxious when you don't have your phone with you?",
        options: [
          { value: "0", label: "Never" },
          { value: "1", label: "Rarely" },
          { value: "2", label: "Sometimes" },
          { value: "3", label: "Often" },
          { value: "4", label: "Always" }
        ]
      },
      {
        id: "3",
        text: "How often do you use your phone during meals with others?",
        options: [
          { value: "0", label: "Never" },
          { value: "1", label: "Rarely" },
          { value: "2", label: "Sometimes" },
          { value: "3", label: "Often" },
          { value: "4", label: "Always" }
        ]
      },
      {
        id: "4",
        text: "How often do you reach for your phone when you feel bored?",
        options: [
          { value: "0", label: "Never" },
          { value: "1", label: "Rarely" },
          { value: "2", label: "Sometimes" },
          { value: "3", label: "Often" },
          { value: "4", label: "Always" }
        ]
      },
      {
        id: "5",
        text: "How often do you use your phone right before bed?",
        options: [
          { value: "0", label: "Never" },
          { value: "1", label: "Rarely" },
          { value: "2", label: "Sometimes" },
          { value: "3", label: "Often" },
          { value: "4", label: "Always" }
        ]
      },
      {
        id: "6",
        text: "How often do you interrupt conversations to check your phone?",
        options: [
          { value: "0", label: "Never" },
          { value: "1", label: "Rarely" },
          { value: "2", label: "Sometimes" },
          { value: "3", label: "Often" },
          { value: "4", label: "Always" }
        ]
      },
      {
        id: "7",
        text: "How often do you feel that you spend too much time on your phone?",
        options: [
          { value: "0", label: "Never" },
          { value: "1", label: "Rarely" },
          { value: "2", label: "Sometimes" },
          { value: "3", label: "Often" },
          { value: "4", label: "Always" }
        ]
      }
    ]
  }
};

const Questionnaire = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        toast.error("Please log in to complete questionnaire");
        navigate("/auth");
      }
    };
    checkUser();
  }, [navigate]);

  const questionnaireType = type as QuestionnaireType;
  const data = questionnaireData[questionnaireType];

  if (!data) {
    navigate("/mood");
    return null;
  }

  const Icon = data.icon;

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== data.questions.length) {
      toast.error("Please answer all questions");
      return;
    }

    if (!userId) {
      toast.error("Please log in to save results");
      navigate("/auth");
      return;
    }

    const totalScore = Object.values(answers).reduce((sum, val) => sum + parseInt(val), 0);

    try {
      const { error } = await supabase
        .from('questionnaire_results')
        .insert({
          user_id: userId,
          questionnaire_type: questionnaireType,
          score: totalScore,
          answers: answers
        });

      if (error) throw error;

      toast.success(`Check-in completed! Score: ${totalScore}`);
      navigate("/mood");
    } catch (error: any) {
      toast.error(error.message || "Failed to save results");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-calm px-6 pt-12 pb-8 mb-6">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/mood")}
            className="mb-4 -ml-2"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <Icon className={`w-8 h-8 ${data.color}`} />
            <h1 className="text-3xl font-bold text-foreground">{data.title}</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Over the last 2 weeks, how often have you been bothered by the following?
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-2xl px-6">
        <div className="space-y-6 mb-8">
          {data.questions.map((question, index) => (
            <Card key={question.id} className="p-6 border-border/50">
              <h3 className="font-semibold text-foreground mb-4">
                {index + 1}. {question.text}
              </h3>
              <RadioGroup
                value={answers[question.id]}
                onValueChange={(value) => handleAnswerChange(question.id, value)}
              >
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                      <Label
                        htmlFor={`${question.id}-${option.value}`}
                        className="flex-1 cursor-pointer text-foreground"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </Card>
          ))}
        </div>

        <Button onClick={handleSubmit} size="lg" className="w-full rounded-full mb-6">
          Submit Check-in
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Questionnaire;
