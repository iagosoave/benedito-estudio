// // components/PortfolioSection.jsx
// import React, { useState, useEffect } from 'react';
// import { createClient } from 'contentful';

// // Configuração do cliente Contentful
// const client = createClient({
//   space: 'c5hge0w5c0xl',
//   environment: 'master',
//   accessToken: 'raTfSm-jXPODcOc0NiSRDMpN4cD9aI1FuA9tZG88NiM'
// });

// // Os 5 projetos fixos definidos no código
// const fixedProjects = [
//   {
//     id: "fixed-1",
//     title: "Sombras da Metrópole",
//     year: "2024",
//     media: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     description: "Um thriller psicológico que explora os mistérios e segredos de uma cidade grande através dos olhos de um detetive atormentado."
//   },
//   {
//     id: "fixed-2",
//     title: "Além do Horizonte",
//     year: "2023",
//     media: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     description: "Uma jornada épica de aventura e descoberta, onde um grupo de exploradores busca uma civilização perdida."
//   },
//   {
//     id: "fixed-3",
//     title: "Sussurros do Passado",
//     year: "2023",
//     media: "https://images.unsplash.com/photo-1559583109-3e7968e11449?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
//     description: "Um drama histórico que retrata a vida de uma família durante um período turbulento da história do Brasil."
//   },
//   {
//     id: "fixed-4",
//     title: "Conexões Invisíveis",
//     year: "2022",
//     media: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1225&q=80",
//     description: "Uma comédia romântica contemporânea sobre relacionamentos na era digital e os desafios de conexões reais."
//   },
//   {
//     id: "fixed-5",
//     title: "Ecos da Natureza",
//     year: "2022",
//     media: "https://images.unsplash.com/photo-1518134346374-184f9d21cea2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     description: "Um documentário impactante sobre a relação entre humanidade e meio ambiente, com imagens deslumbrantes de ecossistemas ameaçados."
//   }
// ];

// const PortfolioSection = () => {
//   const [additionalProjects, setAdditionalProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAllProjects, setShowAllProjects] = useState(false);

//   useEffect(() => {
//     // Função para buscar projetos adicionais do Contentful
//     const fetchAdditionalProjects = async () => {
//       try {
//         const response = await client.getEntries({
//           content_type: 'portifolioStudio',
//           order: '-sys.createdAt',
//         });

//         if (response.items && response.items.length > 0) {
//           // Transformar os dados do Contentful para o formato que usamos
//           const contentfulProjects = response.items.map(item => {
//             try {
//               return {
//                 id: item.sys.id,
//                 title: item.fields.ttuloDoProjeto || "Sem título",
//                 year: item.fields.anoDoProjeto || "Sem ano",
//                 media: item.fields.imagemDoProjeto && item.fields.imagemDoProjeto.fields && 
//                        item.fields.imagemDoProjeto.fields.file ? 
//                        "https:" + item.fields.imagemDoProjeto.fields.file.url : 
//                        "https://placehold.co/600x900/222/white?text=Sem+Imagem",
//                 description: item.fields.descrioDoProjeto || "Sem descrição",
//                 isContentful: true
//               };
//             } catch (err) {
//               console.error("Erro ao processar projeto:", err);
//               return null;
//             }
//           }).filter(Boolean); // Remove itens nulos
          
//           setAdditionalProjects(contentfulProjects);
//         }
        
//         setLoading(false);
//       } catch (err) {
//         console.error('Erro ao buscar projetos do Contentful:', err);
//         setError('Falha ao carregar projetos adicionais.');
//         setLoading(false);
//       }
//     };

//     fetchAdditionalProjects();
//   }, []);

//   // Componente para o card de projeto
//   const ProjectCard = ({ project }) => {
//     const [imageError, setImageError] = useState(false);
    
//     return (
//       <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
//         {/* Mídia do projeto com efeito de hover */}
//         <div className="relative h-96 w-full overflow-hidden">
//           <img
//             src={imageError ? "https://placehold.co/600x900/222/white?text=Imagem+Indisponível" : project.media}
//             alt={project.title}
//             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//             onError={() => setImageError(true)}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80" />
//         </div>
        
//         {/* Informações do projeto */}
//         <div className="absolute bottom-0 left-0 w-full p-6 text-white">
//           <h3 className="mb-1 text-2xl font-bold">{project.title}</h3>
//           <div className="mb-3">
//             <span className="text-sm">{project.year}</span>
//             {project.isContentful && (
//               <span className="ml-2 rounded bg-red-600 px-2 py-1 text-xs">Novo</span>
//             )}
//           </div>
//           <p className="mb-4 line-clamp-2 text-sm opacity-80">{project.description}</p>
          
//           {/* Botão de detalhes */}
//           <div className="flex">
//             <button className="rounded bg-red-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-red-700">
//               Ver Detalhes
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Todos os projetos: fixos + adicionais
//   const allProjects = [...fixedProjects, ...additionalProjects];
  
//   // Projetos a serem exibidos com base no estado showAllProjects
//   const displayProjects = showAllProjects 
//     ? allProjects 
//     : allProjects.slice(0, 5);

//   return (
//     <section className="bg-gradient-to-b from-black to-gray-900 py-20">
//       <div className="container mx-auto px-4">
//         {/* Cabeçalho da seção */}
//         <div className="mb-16 text-center">
//           <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Nossos Projetos</h2>
//           <div className="mx-auto h-1 w-24 bg-red-600"></div>
//           <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
//             Conheça as produções mais recentes do nosso estúdio, onde criatividade e inovação se encontram para contar histórias extraordinárias.
//           </p>
//         </div>

//         {/* Grid principal com os 5 projetos fixos */}
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
//           {fixedProjects.map((project) => (
//             <ProjectCard key={project.id} project={project} />
//           ))}
//         </div>

//         {/* Mensagem de carregamento para projetos adicionais */}
//         {loading && (
//           <div className="mt-10 text-center">
//             <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
//             <p className="mt-2 text-white">Carregando projetos adicionais...</p>
//           </div>
//         )}

//         {/* Mensagem de erro */}
//         {error && (
//           <div className="mt-10 text-center">
//             <p className="text-red-400">{error}</p>
//           </div>
//         )}

//         {/* Seção de projetos adicionais do Contentful (se houver) */}
//         {additionalProjects.length > 0 && (
//           <div className="mt-20">
//             <div className="mb-10 text-center">
//               <h3 className="text-3xl font-bold text-white">Projetos Adicionais</h3>
//               <div className="mx-auto mt-3 h-1 w-16 bg-red-600"></div>
//             </div>
            
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {additionalProjects.map((project) => (
//                 <ProjectCard key={project.id} project={project} />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Botão para ver mais projetos (apenas se tiver projetos adicionais) */}
//         {additionalProjects.length > 0 && (
//           <div className="mt-12 flex justify-center">
//             <button 
//               className="group rounded-full border-2 border-red-600 bg-transparent px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-red-600"
//               onClick={() => setShowAllProjects(!showAllProjects)}
//             >
//               {showAllProjects ? 'Mostrar Menos' : 'Ver Todos os Projetos'}
//               <span className={`ml-2 inline-block transition-transform duration-300 ${showAllProjects ? 'rotate-180' : 'group-hover:translate-x-1'}`}>
//                 {showAllProjects ? '↑' : '→'}
//               </span>
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default PortfolioSection;