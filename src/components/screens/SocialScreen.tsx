import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import EssenLogo from "../EssenLogo";

const posts = [
  {
    author: "Essen RH",
    avatar: null,
    role: "Recursos Humanos",
    time: "Hace 3h",
    text: "🎉 ¡Felicitamos a nuestro equipo de Monterrey por alcanzar el objetivo del trimestre! Su compromiso y dedicación nos inspiran a todos. #OrgulloEssen",
    image: true,
    likes: 47,
    comments: 12,
    liked: false,
  },
  {
    author: "María García",
    avatar: "MG",
    role: "Dir. de Operaciones",
    time: "Hace 6h",
    text: "Compartimos el nuevo manual de procedimientos actualizado para 2026. Por favor revísenlo y envíen sus comentarios antes del viernes. 📋",
    image: false,
    likes: 23,
    comments: 5,
    liked: true,
  },
  {
    author: "Essen Cultura",
    avatar: null,
    role: "Cultura Organizacional",
    time: "Ayer",
    text: "🏃‍♂️ ¡Inscríbete a la carrera corporativa 2026! Este 15 de marzo corremos juntos. Más información en el link del bio.",
    image: true,
    likes: 89,
    comments: 31,
    liked: false,
  },
];

const SocialScreen = () => {
  return (
    <div className="py-4 space-y-4 animate-fade-in">
      {/* Stories row */}
      <div className="px-5">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {["RH", "Cultura", "Mtto", "Ventas", "IT"].map((area, i) => (
            <div key={i} className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-14 h-14 rounded-full gradient-brand p-0.5">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <span className="text-xs font-bold text-foreground">{area.slice(0, 2)}</span>
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">{area}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-3">
        {posts.map((post, i) => (
          <article key={i} className="bg-card border-y border-border">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3">
              {post.avatar ? (
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-xs">{post.avatar}</span>
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
                  <EssenLogo size={20} variant="white" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-bold">{post.author}</p>
                <p className="text-[11px] text-muted-foreground">{post.role} · {post.time}</p>
              </div>
              <button className="p-1">
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Image placeholder */}
            {post.image && (
              <div className="w-full aspect-video gradient-brand opacity-30 flex items-center justify-center relative">
                <span className="text-foreground text-sm font-medium absolute">📸 Imagen</span>
              </div>
            )}

            {/* Text */}
            <div className="px-4 py-3">
              <p className="text-sm leading-relaxed">{post.text}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 px-4 pb-3">
              <button className={`flex items-center gap-1.5 ${post.liked ? "text-primary" : "text-muted-foreground"}`}>
                <Heart className={`w-5 h-5 ${post.liked ? "fill-primary" : ""}`} />
                <span className="text-xs font-semibold">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-muted-foreground">
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs font-semibold">{post.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 text-muted-foreground ml-auto">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SocialScreen;
