import { getParts } from "~/models/part.server";
import SelectPart from "./part";

export const loader = async () => {
  return await getParts();
};

export default function Index() {
  return (
    <main>
      <SelectPart />
    </main>
  );
}
