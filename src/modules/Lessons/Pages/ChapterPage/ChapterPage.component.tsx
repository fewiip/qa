import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks";

export const ChapterPage = () => { 

  const cssMarkdownCodeblock = `CSS code example:
 
~~~css
.container{
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
}
 
.child-1{
  background-color: red;
}
 
.child-2{
  background-color: blue;
}
 
~~~
`;

  const markdown = `
  __Animes pra assistir__
1. Metallic Rouge
1. Azumanga Daioh!
1. Black Lagoon 
1. Elfin Lied
1. Mushishi
1. FullMetal Sigma Pi
1. Record of Lodoss War
1. Eureka Seven
1. Escaflowne
1. Sacred Seven
1. Phantom Quest Corp 
1. Record of Lodoss War
1. fate/zero
1. Deadman Wonderman 
1. Frieren e a jornada para o além
1. MEGALOBOX 2: NOMAD
1. MDS geist
1. U S Manga Corps
1. Shinguang daili ren 
1. yokohama kaidashi kikou 
1. Souvenir : "Iria - Zeiram" (OVA series / 1994).
Original designs by Masakazu Katsura.
1. Kekkai Sensen
1. Um tio de outro mundo
1. Akebi-chan no Sailor-fuku
1. shurato
1. bastard
1. One piece
1. Cyberpunk (na netflix)
1. Himouto! Umaru-chan!
1. jyu-oh-sei planet of the beast king
1. Overlord
1. Michiko to Hatchin 
1. ODD TÁXI
1. Ousama Ranking
1. Do It Yourself
1. Spy family
1. mushoku tensei
1. Mob psycho 100 III:
https://animes.vision/animes/mob-psycho-100-iii
https://goyabu.com/videos/103058513/ 
1. Chainsaw Man: https://animes.vision/animes/chainsaw-man/episodio-02/legendado
1. Bleach: https://animes.vision/animes/bleach-sennen-kessen-hen/episodio-02/legendado
1. Urusei Yatsura: https://goyabu.com/assistir/urusei-yatsura-2022/
1. Boku no Hero: https://goyabu.com/assistir/boku-no-hero-academia-6/
1. Sono Bisque Doll / My Dress-Up Darling
1. Go nakai 
1. Mushoku Tensei: Jobless reincarnation
1. Magnetic Rose (Katushiro Otomo)
1. Handyman Saitou In Another World
1. Sangatsu no Lion
1. Tengoku Daimakyou
1. Iron Fortress
1. Guerreiras Mágicas de Rayearth
1. Suzumiya Haruhi No Yuuutsu  (the melancoly of )
1. Tekkaman Blade : Twin Blood
1. tengoku daimakyou
1. daibanchou from alicesoft
'. Tsurezure Children
1. Vandread
1. Lupin III : Chikemuri no Ishikawa Goemon
1. Tengoku
1. Planetes 
1. Chrono Crusade
1. Tengoku Daimakyou (Heavenly Delusion).
1. giant robo 
1. Big O 
1. Yokohama Kaidashi Kikou: Quiet Country Cafe
1. gunbuster
1. diebuster
1. Tengoku Daimakyō 
1. KOTEGAWA YUI 
1. kareshi kanojo no jijou 
1. Kobayashi-san Chi no Maid Dragon
1. ichigo mashimaro anime

OVA
1. Mighty Space Miners

Mangás pra ler 
1. d gray man 
1. black clover 
1. vagabond
1. berserk 
1. real 
1. rosario + vampire 
1. one piece
1. fukka
1. hajime no ippo
1. ruri dragon by Shindou Masaoki 
1. mangá da chapeuzinho vermelho  - The Hunters Guild: Red Hood by Kawaguchi Yuuki
1. Gachiakuta
1. tengoku daimakyou
1. Emanon Volume 1: Memories of Emanon
1. Stop!! Hibari-kun!
1. tenjou tenghe
1. kingdom 
1. Insomniacs afterschool - Kimi wa Houkago Insomnia
1. atelie witch hat 

Manhwas
1. Chonchu https://mangadex.org/title/92997fa3-d957-4e72-9531-2cbce8974ddd/chunchu



__Filmes__
1. Ted Bundy
1. Northman
1. Grey man
1. Meu Jantar com André (1981)
1. Trem Bala
1. Colateral
1. Kiss kiss bang bang
1. Nice guys
1. Morte no Nilo
1. Legalmente loira
1. Spencer
1. "Um time show de bola".
1. Gattaca
1. AD astra 
1. Lunar
1. O enigma de andromeda 
1. Contato 
1. Crossroad -  encruzilhada 1985
1. Motoqueiros selvagens 
1. Ilha dos Cachorros
1. ALONG WITH THE GODS: THE TWO WORLDS
1. Krull 
1. Lisbela e o Prisioneiro
1. O Homem do Ano
1. O Homem do Futuro
1. Serra Pelada
1. Meu Nome Não É Johnny
1. A Mulher Invisível 
1. Bicho de Sete Cabeças 
1. Caramuru 
1. Cidade Baixa
1. Ó Paí, Ó
1. Redentor
1. Titan A.E 
1. Guardiões da honra 
1. The Baz Luhrmann Romeo and Juliet 
1. O Pior Vizinho do Mundo
1. Maus momentos no hotel royale 
1. uma familia de dois 
1. campeões (2023)
1. Prisioneiros de Ghostland ( n sei em qual plataforma tem)
1. liga da justica crise em duas terras tem em dvd  ou na inter
1. legend of drunk master 
1. tomb raider 
1. indiana jones 
1. star wars 
1. aliens
1. prometheus 
1. exterminador do futuro 
1. robocop 
1. godzilla 
1. black hawk down
1. gladiator 
1. troia 
1. cruzadas 
1. seven samurai 
1. mad max 
1. diary of a wimpy kid - 2010

__Series pra assistir__
1. sons of anarchy 
1. Fleabag
1. Preacher 
1. Hunters 
1. Sob pressão
1. 90 dias pra casar 
1. Sobrenatural
1. You (netflix)
1. May Calamawy
1. Parks and Recreation 
1. Atlanta 
1. Tales of arcadia
1. "Incendies" - Denis Villeneuve (2010)
1. "The Lovely Bones" - Peter Jackson  
1. "Irreversible" - Gaspar Noé
1. "Jojo Rabbit" - Taika Waititi  
1. "Requiem for a dream" - Darren Aronofsky  
1. "Apocalypse Now" - Francis Ford Coppola
1. "Jeepers Creepers" - Victor Salva 
1. "The Mist" - Frank Darabont 
1. "Pet Sematary" - Mary Lambert 
1. "Shutter" - Banjong Pisanthanakun
1. "Children of Men" - Alfonso Cuarón
1. "Antichrist" - Lars von Trier
1. "I am Sam" - Jessie Nelson
1. "Violet y Finch" - Brett Haley
1. "Nocturnal Animals" - Tom Ford


__Desenhos pra assistir na HBO Max/Netflix__
1. Mutante Rex
1. batman
1. Liga da justiça
1. Ben 10

__Desenhos antigos pra reassistir/desenhar__
1. dragon booster - desenho de corrida de dragões
1. code lyoko 
1. roboboy 
1. uma robô adolecente 
1. might bee
1. dalila e julius
1. betty atomica
1. lola e viginia
1. charlie e lola 
1. Oban star racers


__Livros__
1. Fundação
1. Revolução dos bichos
1. 1984

__Animes favoritos__
1. Toki wo Kakero Shoujo 
1. Yoru wa mijikashi arukeyo otome 
1. ghost in the shell 
1. akira 
1. fma antigo 
1. naruto
1. tengen toppa 
1. evangelion 

Filmes favoritos
1. digimon
1. spiderman 2
1. batman o cavaleiro das trevas
1. fastastico senhor raposo
1. hotel budapeste 
1. cao de briga 

series que eu ja assisti 
demolidor
breaking bad
better call saul 
smallville 
vikings 


jogos pra zerar

snes
1. metal warriors 
1. metal marines 
1. dragon view
1. knights of the round 
1. front mission gun hazard 
1. fire emblem genealogy of the holy war 
1. metroid
1. castlevania 


1. mother 2 / earthbound 
1. soul blazer 
1. illusion of gaia 
1. terranigma 
1. lufia 2 
1. dragon quest 

switch
1. Trinity Trigger
1. trials of mana `;
  return <>
  <ReactMarkdown remarkPlugins={[remarkBreaks]}>
   {markdown}
  </ReactMarkdown>
  
  </>
}