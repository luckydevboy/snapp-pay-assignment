import { useGetPassengers } from "@/apis";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

const Home = () => {
  const {
    data: passengers,
    isLoading,
    isError,
    error,
    fetchNextPage,
  } = useGetPassengers();

  // TODO: handle loading
  if (isLoading) {
    return <>Loading...</>;
  }

  // TODO: handle error
  if (isError) {
    return <>{error.message}</>;
  }

  return (
    <main className="grid grid-cols-3 gap-4">
      {passengers?.map((passenger) => (
        <Card key={passenger.id}>
          <CardHeader>
            <CardTitle>
              {passenger.first_name} {passenger.last_name}
            </CardTitle>
            <CardDescription>{passenger.company}</CardDescription>
          </CardHeader>
          <CardContent>
            <div>{passenger.phone}</div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={() => fetchNextPage()}>Next</Button>
    </main>
  );
};

export default Home;
