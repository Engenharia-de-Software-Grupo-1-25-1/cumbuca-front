import { useEffect, useState } from 'react';
import TagBox from './TagBox';
import { coresTags } from '../utils/coresTags';
import { getTagsPopulares } from '../../services/tagService';
import { message, Spin } from 'antd';

// Container de Tags Populares ordenadas de mais a menos publicações
function TagsPopulares() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('tagsPopulares');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    async function carregarTags() {
      const raw = sessionStorage.getItem('tagsPopulares');
      if (raw) {
        try {
          const cached = JSON.parse(raw);
          if (Array.isArray(cached)) {
            setTags(cached);
            setLoading(false);
            return;
          } else {
            sessionStorage.removeItem('tagsPopulares');
          }
        } catch {
          sessionStorage.removeItem('tagsPopulares');
        }
      }

      try {
        const data = await getTagsPopulares(5);
        const safe = Array.isArray(data) ? data : [];
        setTags(safe);
        sessionStorage.setItem('tagsPopulares', JSON.stringify(safe));
      } catch (error) {
        console.error(error);
        message.error('Erro ao carregar tags!');
        setTags([]);
      } finally {
        setLoading(false);
      }
    }

    carregarTags();
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const list = Array.isArray(tags) ? tags.slice(0, 5) : [];

  return (
    <ul className="bg-[#f7d799] rounded-xl flex flex-col text-center items-center w-[22%] md:w-auto p-4 gap-4 hidden sm:hidden md:flex lg:flex h-fit mr-4 sm:ml-0 md:ml-0 lg:ml-8">
      <h1 className="text-[#d4490c] font-semibold leading-tight text-4xl">Tags Populares</h1>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Spin size="large" />
        </div>
      ) : (
        list.map((tag, index) => {
          const cor = coresTags[index % coresTags.length] || {};
          return (
            <li key={`${tag.tag}-${index}`} className="w-full">
              <TagBox tag={tag} corFundo={cor.corFundo} corDestaque={cor.corDestaque} />
            </li>
          );
        })
      )}
    </ul>
  );
}

export default TagsPopulares;
