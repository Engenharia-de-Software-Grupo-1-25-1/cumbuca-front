import Layout from "../components/layouts/Layout6";
import EstabelecimentoBox from "../components/layouts/EstabelecimentoBox";
import { useParams } from 'react-router-dom';

export default function Estabelecimento() {
    const { id } = useParams(); 
    return (
        <Layout Conteudo={EstabelecimentoBox} conteudoProps={{ estabelecimentoId: id }} />
    );
}
