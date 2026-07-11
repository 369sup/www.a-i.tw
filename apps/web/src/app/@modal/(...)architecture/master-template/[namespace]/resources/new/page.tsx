import { CreateResourceDialog } from "@/src/modules/master-template/src/presentation/create-resource-dialog";

export default async function NewResourceModal({
  params,
}: {
  params: Promise<{ namespace: string }>;
}) {
  const { namespace } = await params;
  return <CreateResourceDialog namespace={namespace} />;
}
