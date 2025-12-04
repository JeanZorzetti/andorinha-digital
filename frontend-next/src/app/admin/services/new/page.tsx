import { ServiceForm } from "@/components/admin/services/ServiceForm";

export default function NewServicePage() {
  return <ServiceForm mode="create" />;
}

export const metadata = {
  title: "Novo Serviço | Admin",
};
