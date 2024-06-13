import Link from "next/link";
import { useRouter } from "next/router";

const LoginPage = () => {
    const router = useRouter();
    const handlerLogin = () => {
        router.push('/product')
    }
    return (
        <div>
            <h1>Login Page 1</h1>
            <button onClick={() => handlerLogin()}>Login</button>
            <p>
                Belum punya akun? registerasi <Link href={"/auth/register"}>disini</Link>
            </p>
        </div>
    )
};

export default LoginPage;