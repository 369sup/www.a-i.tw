import { CreateResourcePage } from "@/src/modules/master-template/src/presentation/create-resource-page";

export default async function NewResourcePage({
  params,
}: {
  params: Promise<{ namespace: string }>;
}) {
  const { namespace } = await params;
  return <CreateResourcePage namespace={namespace} />;
}
