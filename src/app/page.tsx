import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Coins, FileText, Wallet, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-black to-gray-900">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      {/* Glowing orbs */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl"></div>
      <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-12 text-center">
          <div className="space-y-4 flex flex-col gap-4 items-center">
            <div className="inline-flex w-fit items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm gap-2">
              <Zap className="h-4 w-4" />
              <span>Powered by Jupiter Protocol</span>
            </div>
            <h1 className="text-2xl mb-1 font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Welcome to</span>
              <span className="block  bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-900">
                CypheirPay
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-gray-300 sm:text-base">
              Revolutionize your business with our decentralized crypto payment
              gateway. Seamlessly accept, manage, and convert crypto payments.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/dashboard">
                Launch App <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/create-invoice">
                Create Invoice <FileText className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Features section */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<FileText className="h-6 w-6" />}
            title="Smart Invoices"
            description="Generate and manage blockchain-powered invoices with ease."
          />
          <FeatureCard
            icon={<Coins className="h-6 w-6" />}
            title="Multi-Token Support"
            description="Accept various cryptocurrencies, always settle in USDC."
          />
          <FeatureCard
            icon={<Wallet className="h-6 w-6" />}
            title="Instant Settlement"
            description="Receive funds directly in your wallet with automatic conversion."
          />
        </div>

        {/* Stats section */}
        <div className="mt-24 rounded-2xl border border-primary/20 bg-primary/5 p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <StatCard
              title="Total Volume"
              value="$2.4M+"
              description="Processed securely"
            />
            <StatCard
              title="Merchants"
              value="350+"
              description="Trust our platform"
            />
            <StatCard
              title="Avg. Savings"
              value="3.2%"
              description="On transaction fees"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-xl border border-primary/20 bg-primary/5 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/10">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary group-hover:bg-primary/30">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-100">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <p className="text-sm font-medium uppercase text-primary">{title}</p>
      <h3 className="mt-2 text-4xl font-bold text-white">{value}</h3>
      <p className="mt-1 text-sm text-gray-300">{description}</p>
    </div>
  );
}
