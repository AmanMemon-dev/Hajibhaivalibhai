import { Hero } from '@/components/hero/Hero';
import { ExploreGrid, VisualizeTeaser, EstimatorTeaser, InspirationPreview, FinalCta } from '@/components/home/Sections';

export default function Home() {
  return (<><Hero /><ExploreGrid /><VisualizeTeaser /><EstimatorTeaser /><InspirationPreview /><FinalCta /></>);
}
