import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CardWithForm() {
  return (
    <Card className="mx-5">
      <CardHeader>
        <CardTitle>Tady soutěže</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href="/fantasy">
          <Button>fantasy</Button>
        </Link>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
