import { Button } from '@/components/ui';
export default function NotFound() {
  return <div className="container-x py-32 text-center"><p className="eyebrow">404</p><h1 className="text-step-4 mt-4">This surface doesn&apos;t exist.</h1><p className="text-muted mt-4">The page you were looking for has moved or never existed.</p><div className="mt-8 flex gap-3 justify-center flex-wrap"><Button href="/">Home</Button><Button href="/materials/" variant="ghost">Browse materials</Button></div></div>;
}
