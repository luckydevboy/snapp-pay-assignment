import { PassengerDto } from "@/apis";
import { ContactCard } from "@/components";

type Props = {
  contacts: PassengerDto[];
};

const FrequentList = ({ contacts }: Props) => {
  if (contacts.length === 0) return null;

  return (
    <div className="pr-6">
      <h1 className="text-xl mb-3 font-bold">Recent</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {contacts.map((contact) => (
          <ContactCard passenger={contact} />
        ))}
      </div>
    </div>
  );
};

export default FrequentList;
