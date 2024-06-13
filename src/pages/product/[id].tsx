import { fetcher } from "@/lib/swr/fetcher";
import DetailProduct from "@/views/DetailProduct";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ProductType } from "../types/product.type";

const DetailProductPage = ({product}: {product: ProductType}) => {
    const router = useRouter();

    // client-side
    // const { data, error, isLoading } = useSWR(`/api/product/${router.query.id}`, fetcher);
    
    return (
        <div>
            {/* client-side */}
            {/* <DetailProduct product={isLoading ? {} : data.data} /> */}
            {/* server-side */}
            <DetailProduct product={product} />
        </div>
    )
};

export default DetailProductPage;

export async function getServerSideProps({ params }: { params: { id:string } }) {
    // fetch data
    const res = await fetch(`http://localhost:3000/api/product/${params.id}`)
    const response = await res.json();
    
    return {
        props: {
            product: response.data
        }
    }
}