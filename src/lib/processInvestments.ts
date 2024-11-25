import { ObjectId } from "mongoose";

interface Investment {
  _id: ObjectId;
  userId: ObjectId;
  amount: number;
  duration: number;
  startDate: string;
  endDate: string;
  status: string;
  __v?: number;
}

// Define the type for a single investment plan
interface Plan {
  plan: string;
  minAmount: number;
  maxAmount: number | "Unlimited"; // 'Unlimited' for Diamond Plan
  roi: string; // ROI as string like "10%"
  duration: string;
}

// Define the structure of the processed investment with added fields
interface ProcessedInvestment {
  _id: ObjectId;
  userId: ObjectId;
  amount: number;
  startDate: string;
  endDate: string;
  status: string;
  __v?: number;
  plan: string;
  roi: number;
  duration: string;
}

// Sample investment plans
const InvestmentsPlan: Plan[] = [
  {
    plan: "Basic Plan",
    minAmount: 50,
    maxAmount: 499,
    roi: "10%",
    duration: "24 Hours",
  },
  {
    plan: "Silver Plan",
    minAmount: 600,
    maxAmount: 1999,
    roi: "40%",
    duration: "24 Hours",
  },
  {
    plan: "Gold Plan",
    minAmount: 2000,
    maxAmount: 4999,
    roi: "50%",
    duration: "48 Hours",
  },
  {
    plan: "Diamond Plan",
    minAmount: 5000,
    maxAmount: "Unlimited",
    roi: "100%",
    duration: "3 Days",
  },
];

// Function to calculate ROI and return processed investment
export function calculateRoi(
  investment: Investment
): any {
  const plan = InvestmentsPlan.find((p) => {
    return (
      investment.amount >= p.minAmount &&
      investment.amount <=
        (p.maxAmount === "Unlimited" ? Infinity : p.maxAmount)
    );
  });

  if (plan) {
    const roiPercentage = parseFloat(plan.roi.replace("%", ""));
    const roiValue = (investment.amount * roiPercentage) / 100;

    return {
      ...investment,
      plan: plan.plan,
      roi: roiValue,
      duration: plan.duration,
    };
  }

  return investment;
}

// Function to process all investments
export function processInvestments(
  investments: Investment[]
): ProcessedInvestment[] {
  return investments.map((investment) => calculateRoi(investment));
}

export function calculateTotalProfits(investments: ProcessedInvestment[]): number {
  return investments.reduce((totalProfit, investment) => {
    if (investment.status === "Approved") {
      const profit = (investment.amount * investment.roi) / 100;
      return totalProfit + profit;
    }
    return totalProfit;
  }, 0);
}

// Function to calculate total deposits-0-
export function calculateTotalDeposits(investments: Investment[]): number {
  return investments.reduce(
    (totalDeposit, investment) => totalDeposit + investment.amount,
    0
  );
}
