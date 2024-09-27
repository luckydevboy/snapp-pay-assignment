import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { IPassenger } from "@/lib/interface.ts";

type Props = {
  // TODO: replace passenger by contact
  passenger: IPassenger;
};

const ContactCard = ({ passenger }: Props) => {
  return (
    <Link to={`/contacts/${passenger.id}`}>
      <Card className="hover:border-primary cursor-pointer transition-colors">
        <CardHeader>
          <CardTitle>
            {passenger.first_name} {passenger.last_name}
          </CardTitle>
          <CardDescription>{passenger.company ?? "---"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>{passenger.phone}</div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ContactCard;
