import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { PartConfig } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getPartById, getPartConfigsByPartId, getPartMassesByPartConfigId } from "~/models/part.server";

library.add(faArrowRight);

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.partId, "partId not found");

  const partId = parseInt(params.partId);

  const part = await getPartById(partId);

  const partConfigs: PartConfig[] = await getPartConfigsByPartId(partId);

  const masses = await Promise.all(partConfigs.map(async (partConfig) => await getPartMassesByPartConfigId(partConfig.id)));

  return json({ part, partConfigs, masses });
}

export default function PartDetails() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col  text-white text-2xl font-bold">
      <h3> {data.part?.category} <FontAwesomeIcon className=" " icon="arrow-right" /> {data.part?.subcategory}</h3>
      <h1 className="text-3xl">{data.part?.name}</h1>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Part not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
