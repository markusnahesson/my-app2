import Link from 'next/link';
import styles from './Register.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';


const RegisterView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {push} = useRouter();
    const [error, setError] = useState("");

    async function handleSubmit(event: any) {
        event.preventDefault();
        setError("");
        setIsLoading(true);
        const data = {
            email: event.target.email.value,
            fullname: event.target.fullname.value,
            password: event.target.password.value
        };
        const result = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log(data)
        console.log(result)

        if (result.status === 200) {
            event.target.reset();
            setIsLoading(false);
            push("/auth/login");
        }
        else{
            setIsLoading(false);
            setError(result.status === 400 ? "Email already exists" : "");
        }
    }
    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Register</h1>
            {error && <p className={styles.register__error}>{error}</p>}
            <div className={styles.register__form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.register__form__item}>
                        <label htmlFor="email" className={styles.register__form__item__label}>Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="fullname" className={styles.register__form__item__label}>Full Name</label>
                        <input type="text" id="fullname" name="fullname" placeholder="Full Name" className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="password" className={styles.register__form__item__label}>Password</label>
                        <input type="password" id="password" name="password" placeholder="Password" className={styles.register__form__item__input} />
                    </div>
                    <button type="submit" className={styles.register__form__item__button} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </form>
            </div>
            <p className={styles.register__link}>Sudah punya akun? Login <Link href="/auth/login">disini</Link></p>
        </div>
    )
};

export default RegisterView;