import TermCard from '../components/ui/Terms/TermCard';

export default function Home() {
  return (
    <div className="wrapper">
      <div className="flex space-even">
        <TermCard type={'term-of-day'} />
        <TermCard type={'most-liked'} />
      </div>
    </div>
  )
}
