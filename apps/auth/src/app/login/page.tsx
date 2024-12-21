import { JwtLoginView } from '../../sections/auth/jwt';

type Props = {
    children: React.ReactNode;
};
export default function Page() {
    return <JwtLoginView />;
}