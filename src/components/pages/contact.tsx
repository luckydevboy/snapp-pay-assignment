import {
  Phone,
  Mail,
  MapPin,
  Briefcase,
  MessageSquare,
  Calendar,
  Clock,
  User,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Separator,
} from "../ui";
import { PassengerDto, useGetPassenger } from "@/apis";

const Contact = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: passenger, status, error } = useGetPassenger(Number(params.id));

  useEffect(() => {
    if (passenger) {
      updateFrequentContacts(passenger);
    }
  }, [passenger]);

  const updateFrequentContacts = (contact: PassengerDto) => {
    let frequentContacts: (PassengerDto & {
      visitCount: number;
      lastVisited: number;
    })[] = JSON.parse(localStorage.getItem("frequents")!) || [];

    const contactIndex = frequentContacts.findIndex((c) => c.id === contact.id);

    if (contactIndex >= 0) {
      frequentContacts[contactIndex].visitCount += 1;
      frequentContacts[contactIndex].lastVisited = Date.now();
    } else {
      frequentContacts.push({
        ...contact,
        visitCount: 1,
        lastVisited: Date.now(),
      });
    }

    frequentContacts.sort((a, b) => {
      const scoreA = calculateScore(a.visitCount, a.lastVisited);
      const scoreB = calculateScore(b.visitCount, b.lastVisited);
      return scoreB - scoreA;
    });

    frequentContacts = frequentContacts.slice(0, 4);

    localStorage.setItem("frequents", JSON.stringify(frequentContacts));
  };

  const calculateScore = (visitCount: number, lastVisited: number) => {
    const timeSinceLastVisit = Date.now() - lastVisited;
    const decayFactor = 1 / (timeSinceLastVisit + 1);
    return visitCount * decayFactor;
  };

  return (
    <>
      <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
      {status === "pending" ? (
        <p></p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        status === "success" && (
          <div className="container mx-auto py-10">
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={passenger.avatar}
                      alt={`${passenger.first_name} ${passenger.last_name}`}
                    />
                    <AvatarFallback>
                      {passenger.first_name[0]}
                      {passenger.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-3xl">
                      {passenger.first_name} {passenger.last_name}
                    </CardTitle>
                    <CardDescription className="text-xl">
                      {passenger.gender}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Contact Information
                      </Label>
                      <Separator className="my-2" />
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{passenger.email ?? "No email"}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{passenger.phone ?? "No phone"}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{passenger.telegram ?? "No telegram"}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Work Information
                      </Label>
                      <Separator className="my-2" />
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{passenger.company ?? "No company"}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{passenger.address ?? "No address"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Additional Information
                      </Label>
                      <Separator className="my-2" />
                      <div className="space-y-2 h-[75px]">
                        <div className="flex items-start">
                          <FileText className="h-4 w-4 mr-2 mt-1 text-muted-foreground flex-shrink-0" />
                          <span className="line-clamp-3">
                            {passenger.note ?? "No note"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Record Information
                      </Label>
                      <Separator className="my-2" />
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{passenger.id ?? "No ID"}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>
                            {new Date(passenger.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>
                            {new Date(passenger.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {/*<Button onClick={() => router.back()} className="w-full">*/}
                {/*  Back to Passenger List*/}
                {/*</Button>*/}
              </CardFooter>
            </Card>
          </div>
        )
      )}
    </>
  );
};

export default Contact;
