import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { PassengerDto } from "@/apis";

type Props = {
  contact: PassengerDto;
};

const ContactCard = ({ contact }: Props) => {
  return (
    <Link to={`/contacts/${contact.id}`}>
      <Card className="hover:border-primary cursor-pointer transition-colors">
        <CardHeader>
          <CardTitle>
            {contact.first_name} {contact.last_name}
          </CardTitle>
          <CardDescription>{contact.company ?? "---"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>{contact.phone}</div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ContactCard;
