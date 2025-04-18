
import { PortfolioTeacher } from '@/components/PortfolioTeacher'

export default function TeacherPortfolioPage({ params }: { params: { studentId: string } }) {
  const studentId = Number(params.studentId);
  return <PortfolioTeacher studentId={studentId} />;
}
