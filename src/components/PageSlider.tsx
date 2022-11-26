import React from "react";
import HTMLFlipBook from "react-pageflip";
import { useAuth } from "../contexts/AuthContext";
import { strapiApi } from "../services/strapiApi";
import { Page } from "./Page";
import { useEffect, useState } from "react";
import { Sticker } from "../global";

const PageSlider = () => {
  const [userStickers, setUserStickers] = useState([]);

  const { user } = useAuth();

  const getUserStickers = async () => {
    const {
      data: { data },
    } = await strapiApi.get(`/user-stickers?filters[email][$eq]=${user?.email}&populate=*`);

    const userStickerIds = data.map((item: any) => {
      return item.attributes.sticker.data.id;
    });

    const userStickers = await Promise.all(
      userStickerIds.map(async (id: number) => {
        const {
          data: { data: stickerData },
        } = await strapiApi.get(`/stickers/${id}?populate=*`);
        return stickerData;
      })
    );
    setUserStickers(userStickers as any);
  };

  useEffect(() => {
    if (!user) return;
    getUserStickers();
  }, [user]);

  return (
      <HTMLFlipBook className='sticker-wrapper page' width={693} height={836}>
        <div className='page cover'></div>
        <div className='page cover'>
          <img className="cover-image" src="https://iili.io/HFzOiap.jpg" alt="Capa do álbum"/>
        </div>
        <div className='page back-cover'>
          <h2 className='back-cover-title'>
            Na trilha da copa 2022
          </h2>
          <p className='back-cover-paragraph'>
            A Copa do Mundo, além do futebol, também traz a mistura do esporte com a cultura musical. A música tema do Mundial, inclusive, é uma das mais esperadas a cada quatro anos.
          </p>
          <p className='back-cover-paragraph'>
            Mas a onda das músicas temas não é nada recente. A primeira oficial foi lançada em 1962, para a Copa do Mundo do Chile. A faixa "El Rock del Mundial", da banda Los Ramblers, foi o som propagado durante a competição.
          </p>
          <img className="back-cover-logo" src="https://iili.io/HF17XTP.png" alt="Logo Spotify" />
          <div className='back-cover-tips'>
            <span className='back-cover-tips-title'> Escanear um código do Spotify</span>
            <ol className='back-cover-tips-list'>
              <li className='back-cover-tips-list-item'>Clique em <strong>Buscar</strong>.</li>
              <li className='back-cover-tips-list-item'>Clique em barra de busca</li>
              <li className='back-cover-tips-list-item'>Clique na câmera.</li>
              <li className='back-cover-tips-list-item'>Clique em <strong>ESCANEAR</strong></li>
              <li className='back-cover-tips-list-item'>Aponte sua câmera para o código do Spotify</li>
            </ol>
          </div>
        </div>
        <div className="page page-1">
          <Page 
            stickers = {
              userStickers.filter((sticker: Sticker) => {
                return sticker.attributes.category.data.attributes.name === 'Cup songs'
              })
            }
          />
        </div>
        <div className="page page-2">
          <Page 
            text = {
              "Acesse o Spotify e, na área de busca, selecione o ícone de câmera para escanear o código ou o print da figurinha para acessar a música/playlist escolhida"
            }
            stickers = {
              userStickers.filter((sticker: Sticker) => {
                return sticker.attributes.category.data.attributes.name === 'Brasil'
              })
            }
            country = {
              "BRASIL"
            }
            description = {
              "1958, 1962, 1970, 1994 e 2002. Único pentacampeão. A Seleção Brasileira chega ao Qatar em busca do tão esperado hexacampeonato da Copa do mundo."
            }
          />
        </div>
        <div className="page page-3">
          <Page 
            stickers = {
              userStickers.filter((sticker: Sticker) => {
                return sticker.attributes.category.data.attributes.name === 'iFood'
              })
            }
            description = {
              "Aproveite os mimos que separamos especialmente para você acompanhar a copa com tudo o que precisa! Peça Ifood mercado e garanta seu estoque para comemorar o hexa!"
            }
            stickerQt = {
              2
            }
            image = {
              "https://iili.io/HFVUJhQ.png"
            }
          />
        </div>
        <div className="page page-4">
          <Page 
             text = {
              "Acesse o Spotify e, na área de busca, selecione o ícone de câmera para escanear o código ou o print da figurinha para acessar a música/playlist escolhida"
             }
             stickers = {
              userStickers.filter((sticker: Sticker) => {
                return sticker.attributes.category.data.attributes.name === 'Alemanha'
              })
            }
            country = {
              "ALEMANHA"
            }
            description = {
              "Maior finalista da história das Copas do Mundo, a Alemanha chega ao Qatar de olho no seu quinto título. Com quatro conquistas - 1954, 1974, 1990 e 2014 - em oito finais disputadas."
            }
          />
        </div>
        <div className="page page-5">
          <Page 
            stickers = {
              userStickers.filter((sticker: Sticker) => {
                return sticker.attributes.category.data.attributes.name === 'Zé Delivery'
              })
            }
            description = {
              "Aproveite os mimos que separamos especialmente para você acompanhar a copa com tudo o que precisa! Peça no Zé Delivery e receba sua cerveja GELADA na porta de casa para não perder 1 minuto de jogo!"
            }
            stickerQt = {
              2
            }
            image = {
              "https://iili.io/HFXNkru.png"
            }
          />
        </div>
        <div className="page page-6">
          <Page 
            text = {
              "Acesse o Spotify e, na área de busca, selecione o ícone de câmera para escanear o código ou o print da figurinha para acessar a música/playlist escolhida"
             }
            stickers = {
              userStickers.filter((sticker: Sticker) => {
                return sticker.attributes.category.data.attributes.name === 'Estados Unidos'
              })
            }
            country = {
              "ESTADOS UNIDOS"
            }
            description = {
              "A equipe está classificada como a 27ª melhor do mundo no Ranking Mundial da FIFA e é uma das melhores seleções da CONCACAF."
            }
          />
        </div>
        <div className="page page-7">
          <Page 
            stickers = {
              userStickers.filter((sticker: Sticker) => {
                return sticker.attributes.category.data.attributes.name === 'Tik Tok'
              })
            }
            description = {
              "Melhores hits, melhores dancinhas, melhores receitas e muito mais! Acesse as playlists mais bombásticas do Spotify e treine suas dancinhas para não sair da For You no Tiktok!"
            }
            stickerQt = {
              2
            }
            image = {
              "https://iili.io/HFX65iv.png"
            }
          />
        </div>
        <div className="page page-8">
          <Page 
          text = {
            "Acesse o Spotify e, na área de busca, selecione o ícone de câmera para escanear o código ou o print da figurinha para acessar a música/playlist escolhida"
           }
            stickers = {
              userStickers.filter((sticker: Sticker) => {
                return sticker.attributes.category.data.attributes.name === 'Japão'
              })
            }
            country = {
              "JAPÃO"
            }
            description = {
              "A Seleção Japonesa de Futebol representa o Japão nas competições de futebol da FIFA. É filiada à instituição desde 1929.  Já disputaram seis Copas do Mundo, sendo uma das mais bem sucedidas seleções asiáticas dos últimos tempos."
            }
          />
        </div>
        <div className="page page-9">
          <Page 
            stickers = {
              userStickers.filter((sticker: Sticker) => {
                return sticker.attributes.category.data.attributes.name === 'Crunchyroll'
              })
            }
            description = {
              "Nem só de futebol vive o homem. Aproveite a pausa entre os jogos e confira a maior seleção de animes no Crunchroll! Acesse agora e confira!"
            }
            stickerQt = {
              2
            }
            image = {
              "https://iili.io/HFhdHEN.png"
            }
          />
        </div>
      </HTMLFlipBook>
  )
};

export default PageSlider;
