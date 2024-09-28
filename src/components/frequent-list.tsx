import { forwardRef } from "react";

import { PassengerDto } from "@/apis";
import { ContactCard } from "@/components";
import { Separator } from "@/components/ui";

type Props = {
  contacts: PassengerDto[];
};

const FrequentList = forwardRef<HTMLDivElement, Props>(({ contacts }, ref) => {
  if (contacts.length === 0) return null;

  return (
    <div ref={ref} className="pr-6">
      <h1 className="text-xl mb-3 font-bold">Recent</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
      <Separator className="my-6" />
    </div>
  );
});

export default FrequentList;
