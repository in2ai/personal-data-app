export class WorkOffer {
  title: string;
  summary: string;
  requiredSkills: string[];
  location: string;
  price: number;
  currency: string;
  period: string;
  nostrId?: string;
  createdAt?: number;
  match?: number;
}
