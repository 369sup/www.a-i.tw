import { CreateResourceDialog } from "@/src/master-template/ux/create-resource-dialog";

export default async function NewResourceModal({
  params,
}: {
  params: Promise<{ namespace: string }>;
}) {
  const { namespace } = await params;
  return <CreateResourceDialog namespace={namespace} />;
}
