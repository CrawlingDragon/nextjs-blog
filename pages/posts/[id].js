import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';

export default function Post({ postData }) {
  return (
    <>
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        {postData.title}
        <br />
        {postData.id}
        <br />
        <Date dateString={postData.date} />
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </Layout>
    </>
  );
}
export async function getStaticPaths() {
  const paths = getAllPostIds();
  // console.log('path:', paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  // console.log('postData:', postData);
  return {
    props: {
      postData,
    },
  };
}
