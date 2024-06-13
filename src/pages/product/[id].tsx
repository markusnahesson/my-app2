import { useRouter } from "next/router";

const DetailProductPage = () => {
    const router = useRouter();
    
    return (
        <div>
            <h1>Detail Product</h1>
            <p>Product : {router.query.id} </p>
        </div>
    )
};

export default DetailProductPage;