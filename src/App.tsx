import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Switch, ScrollView, Linking, Alert } from 'react-native';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isTraditional, setIsTraditional] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [selectedFont, setSelectedFont] = useState('系統字體');
  
  // 翻頁版相關狀態
  const [currentSection, setCurrentSection] = useState(1);
  const [showExplanation, setShowExplanation] = useState(false);
  const [bookmarkedSection, setBookmarkedSection] = useState<number | null>(null);
  
  // 翻頁版頁面狀態（每頁顯示約200字）
  const [currentReaderPage, setCurrentReaderPage] = useState(1);
  const [totalReaderPages, setTotalReaderPages] = useState(1);
  
  // 導航函數
  const goToPage = (pageName: string) => {
    setCurrentPage(pageName);
    // 如果進入翻頁版，檢查是否有書籤
    if (pageName === 'pageReader') {
      if (bookmarkedSection) {
        // 如果有書籤，回到書籤的分段
        setCurrentSection(bookmarkedSection);
      } else {
        // 否則重置為第一分
        setCurrentSection(1);
      }
      setShowExplanation(false);
    }
  };
  
  const goHome = () => {
    setCurrentPage('home');
  };

  // 書籤功能
  const toggleBookmark = () => {
    if (bookmarkedSection === currentSection) {
      // 如果當前分段已經有書籤，則移除書籤
      setBookmarkedSection(null);
    } else {
      // 否則設置書籤到當前分段
      setBookmarkedSection(currentSection);
    }
  };
  
  // 將完整經文分頁（每頁約200字）
  const getPaginatedSutra = () => {
    const allText = sutraSections.map(s => s.content).join('\n\n');
    const wordsPerPage = 200;
    const pages = [];
    
    for (let i = 0; i < allText.length; i += wordsPerPage) {
      pages.push(allText.slice(i, i + wordsPerPage));
    }
    
    return pages;
  };
  
  // 計算總頁數（只在組件初始化時計算一次）
  React.useEffect(() => {
    const pages = getPaginatedSutra();
    setTotalReaderPages(pages.length);
  }, []);
  
  // 翻頁版翻頁函數
  const nextReaderPage = () => {
    if (currentSection < sutraSections.length) {
      setCurrentSection(currentSection + 1);
      setShowExplanation(false);
    }
  };
  
  const prevReaderPage = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      setShowExplanation(false);
    }
  };
  
  // 完整的經文數據（包含內容和解釋）
  const sutraSections = [
      {
      id: 1,
      title: "法會因由分第一",
      content: "如是我聞：一時，佛在舍衛國祇樹給孤獨園，與大比丘眾千二百五十人俱。爾時，世尊食時，著衣持缽，入舍衛大城乞食。於其城中次第乞已，還至本處。飯食訖，收衣缽。洗足已，敷座而坐。",
      explanation: "這是金剛經的開始，描述佛陀在舍衛國的祇樹給孤獨園，與一千二百五十位大比丘一起。佛陀按照慣例，在吃飯時間穿著袈裟，拿著缽，進入舍衛大城乞食。在城中依次乞食完畢後，回到原處，吃完飯，收起袈裟和缽，洗腳，然後鋪好座位坐下。"
    },
    {
      id: 2,
      title: "善現啟請分第二",
      content: "時長老須菩提在大眾中，即從座起，偏袒右肩，右膝著地，合掌恭敬。而白佛言：「希有！世尊。如來善護念諸菩薩，善付囑諸菩薩。世尊！善男子、善女人，發阿耨多羅三藐三菩提心，云何應住？云何降伏其心？」佛言：「善哉！善哉！須菩提！如汝所說，如來善護念諸菩薩，善付囑諸菩薩。汝今諦聽，當為汝說。善男子、善女人，發阿耨多羅三藐三菩提心，應如是住，如是降伏其心。」「唯然！世尊！願樂欲聞。」",
      explanation: "這個時候，眾弟子中德高年長的須菩提，在大眾中從自己的座位上站了起來。他露出右肩，右膝跪地，兩手合掌，很敬重地對如來佛行了一個禮，讚嘆地說：「希有的世尊，您對於未成佛的菩薩弟子，善盡保護憐念他們的善心；又善於咐囑指導一切學佛的大眾。世尊！還有那些善男信女，若是發了無上正等正覺的菩提心時，要怎樣才能使這個菩提心常住不退呢？如果他們起了妄念的時候，又要怎樣去降伏他的妄心呢？」佛回答說：「問得好！問得好啊！照你所說的，知道我善盡保護憐念未成佛的菩薩弟子，也善於咐囑指導一切學佛的大眾，你既然明白這個道理，就要仔細用心地聽，我來為你們解說。」須菩提聽了很快地回答說：「是的，世尊！我很高興聽師父說明這個道理。」"
    },
    {
      id: 3,
      title: "大乘正宗分第三",
      content: "佛告須菩提：「諸菩薩摩訶薩，應如是降伏其心：所有一切眾生之類─若卵生、若胎生、若濕生、若化生；若有色、若無色；若有想、若無想；若非有想非無想，我皆令入無餘涅槃而滅度之。如是滅度無量無數無邊眾生，實無眾生得滅度者。何以故？須菩提！若菩薩有我相、人相、眾生相、壽者相，即非菩薩。」",
      explanation: "佛告訴須菩提說：「諸菩薩、摩訶薩等應按照我下面所說的方法，降伏其妄念心，方可常住菩提心。降伏妄心的方法，就是要不著一切眾生相。我把一切眾生歸分為九類：如卵生、胎生、濕生、化生，如有色、無色，如有想、無想、非有想非無想等眾生。我要為所有眾生滅他們的業障，度他們超脫輪迴六道，以至於不生不死入於清淨無為之鄉。話又說回來，我雖然這樣滅度，但是一切眾生實在沒有得我的滅度。這是為什麼呢？因為眾生與菩薩，同具此菩提心，現在滅他們的妄心而度歸清淨，不過還其所本有，也就是他們自性自度，並非是我所度的。須菩提！若他們有得我滅度的念頭，即是還執著我相、人相、眾生相、壽者相，還是執著自性的眾生，尚未滅度無餘，自然不是菩薩。」"
    },
    {
      id: 4,
      title: "妙行無住分第四",
      content: "復次：「須菩提！菩薩於法，應無所住，行於布施。所謂不住色布施，不住聲、香、味、觸、法布施。須菩提！菩薩應如是布施，不住於相。何以故？若菩薩不住相布施，其福德不可思量。須菩提！於意云何？東方虛空可思量不？」「不也，世尊！」「須菩提！南、西、北方、四維、上、下虛空，可思量不？」「不也。世尊！」「須菩提！菩薩無住相布施，福德亦復如是，不可思量。須菩提！菩薩但應如所教住！」",
      explanation: "佛再對須菩提說：「菩薩於無上正等正覺之法，應該不著相布施。所謂不著相布施，就是要六根清淨，離開色、聲、香、味、觸、法等塵相而布施，也就是施者忘施，受者忘受，並且要忘記所施之物。（如此施空、受空、物空即所謂的『三輪體空』。）須菩提，菩薩應該不住相布施，為什麼呢？因為著相布施，是局於有相；而眾生之相，實在只等於一微塵，即使能因此而獲福也是有限的。若不著相布施，就無相可住，像這樣不住相布施的福德就不可限量了。須菩提！譬如說東方那無邊際的虛空，你可以以心思度量嗎？」須菩提回答說：「不可以。世尊！」佛又說：「須菩提！再與南、西、北四方及上下的虛空那樣毫無邊際，你是否可以用你的心思去度量嗎？」須菩提回答說：「不可以的。世尊！」佛又說：「須菩提！菩薩若能不著相布施，所得的福德也就像虛空這樣的不可限量。須菩提！菩薩應該照我善護念、善咐囑之教，如是降伏妄心，而又不著相布施，常堅守著菩提心。」"
    },
    {
      id: 5,
      title: "如理實見分第五",
      content: "「須菩提！於意云何？可以身相見如來不？」「不也，世尊！不可以身相得見如來。何以故？如來所說身相，即非身相。」佛告須菩提：「凡所有相，皆是虛妄。若見諸相非相，即見如來。」",
      explanation: "佛說：「須菩提！你認為普通修行的人，能看見如來的形體嗎？」須菩提回答說：「世尊！不能見到如來的形體。原因是師父如來您所說的形體，並非形體，是法相，所以不能看見。」佛又告訴須菩提說：「不但我的形相是這樣的，凡世間所有的相，都是虛無不實的。若是識破了諸相都是虛空的道理，就可以見如來的法相了。」"
    },
    {
      id: 6,
      title: "正信希有分第六",
      content: "須菩提白佛言：「世尊！頗有眾生，得聞如是言說章句，生實信不？」佛告須菩提：「莫作是說！如來滅後，後五百歲，有持戒修福者，於此章句，能生信心，以此為實。當知是人，不於一佛、二佛、三四五佛而種善根，已於無量千萬佛所種諸善根。聞是章句，乃至一念生淨信者；須菩提！如來悉知悉見，是諸眾生得如是無量福德。何以故？是諸眾生，無復我相、人相、眾生相、壽者相、無法相，亦無非法相。何以故？是諸眾生若心取相，即為著我、人、眾生、壽者。若取法相，即著我、人、眾生、壽者。何以故？若取非法相，即著我、人、眾生、壽者。是故不應取法，不應取非法。以是義故，如來常說：汝等比丘！知我說法，如筏喻者；法尚應捨，何況非法？」",
      explanation: "須菩提向如來佛稟告說：「世尊！您所說的不住相布施，以及所謂見諸相非相即見如來，這種無相真空的妙理，一般眾生聽了能瞭解相信嗎？」如來佛聽了就告訴須菩提說：「你不能這樣說。我說的法，雖是深妙，難道都沒有相信的人嗎？不但現在有人相信，將來也是會有的。就是到我死後，後五百歲，有持守戒律廣修福田的人，看到此經中的一章一句，自能信以為真。也就可以知道這種人善根深厚，不僅是一二三四五佛所種的善根，乃是從無量佛所種得來的善根。這種人看到此經的一章一句，而能心淨不亂，心信不疑。須菩提！我確可以洞悉此種淨信眾生是通佛性的，是可以得到如十方虛空漫無天際的無量福德。為什麼呢？因為這些眾生善根純熟，已悟得真空無相的道理，已離開我相、人相、眾生相、壽者相；並且無法相，也無非法相。這又為什麼呢？如果這些眾生，若心有所取相，即著了我人眾生壽者四相；若執著此經章句，也是著了我人眾生壽者四相。若心執偏空，就是固執人死身心皆斷滅，歸於空無的一個錯誤的斷見，也與著四相無異。所以於法相實不應執有也不應執無，才得以悟入性空，自然離法。就因為這個道理，所以我常告訴你們這些比丘，對於我所說的一切法，只是要你們假借此法而離相見性；假借此法使你們度脫生死的苦海。如果你們見了自己的本性，證了涅槃之樂時，就可以捨去此法。就好比編竹筏，渡人過河，到了彼岸就不須要再用筏了。似此佛的正法尚且要捨去，何況不是佛法的世間文詞，又為什麼堅持不捨呢？」"
    },
    {
      id: 7,
      title: "無得無說分第七",
      content: "「須菩提！於意云何？如來得阿耨多羅三藐三菩提耶？如來有所說法耶？」須菩提言：「如我解佛所說義，無有定法，名阿耨多羅三藐三菩提；亦無有定法如來可說。何以故？如來所說法，皆不可取、不可說；非法、非非法。所以者何？一切賢聖，皆以無為法，而有差別。」",
      explanation: "佛說：「須菩提！你認為我已得無上正等正覺的菩提嗎？你認為我有說一定之法嗎？」須菩提回答說：「就我所知道了解佛您所說的意思，沒有一定的法。而無上正等正覺的菩提，也沒有一定的法可說。同時，也沒有定法讓如來可說的。為什麼呢？因為您所說的法，是無上菩提之法，可以心悟，而不可以色相取；只可意會，不可以言說；是非法，又是非非法。就是因為這個緣故，不但我師父如來以外，就是一切賢聖，皆用這個無為法自修。只是隨各人所修的程度不同，而所得證悟就有差別。」"
    },
    {
      id: 8,
      title: "依法出生分第八",
      content: "「須菩提！於意云何？若人滿三千大千世界七寶，以用布施。是人所得福德，寧為多不？須菩提言：「甚多。世尊！何以故？是福德，即非福德性。是故如來說福德多。」「若復有人，於此經中，受持乃至四句偈等，為他人說，其福勝彼。何以故？須菩提！一切諸佛，及諸佛阿耨多羅三藐三菩提法，皆從此經出。須菩提！所謂佛法者，即非佛法。」",
      explanation: "佛說：「須菩提！如果有人以充滿了大千世界的金銀七寶來行布施，你認為這個人所得的福德難道不多嗎？」須菩提回答說：「世尊！當然是很多。為什麼呢？因為這種福德，是有相的布施，畢竟還是無福德性。然以人世報施的福德而言，所以您說這個人所得的福德多。」如來佛又說：「如果有人，受持此般若經，甚而只要為人演說此經其中的四句偈、四句等，那麼他所得到的福德，比前面說的用大千世界的七寶施福所得福德更多。為什麼呢？須菩提！因為一切諸佛，及成佛的無上正等正覺菩提法，皆從此經緣生的。所以才說般若是諸佛之母。須菩提！但要注意般若並非佛法。意思就是本來就沒有佛法可言，不過藉之以開悟眾生，替它取名為佛法而已。所以所謂的佛法，就不是佛法。"
    },
    {
      id: 9,
      title: "一相無相分第九",
      content: "「須菩提！於意云何？須陀洹能作是念，我得須陀洹果不？」須菩提言：「不也。世尊！何以故？須陀洹名為入流，而無所入；不入色、聲、香、味、觸、法。是名須陀洹。」「須菩提！於意云何？斯陀含能作是念，我得斯陀含果不？」須菩提言：「不也。世尊！何以故？斯陀含名一往來，而實無往來，是名斯陀含。」「須菩提，於意云何？阿那含能作是念，我得阿那含果不？」須菩提言：「不也。世尊！何以故？阿那含名為不來，而實無不來，是故名阿那含。」「須菩提！於意云何？阿羅漢能作是念，我得阿羅漢道不？」須菩提言：「不也。世尊！何以故？實無有法名阿羅漢。世尊！若阿羅漢作是念，我得阿羅漢道，即為著我、人、眾生、壽者。世尊！佛說我得無諍三昧，人中最為第一，是第一離欲阿羅漢。世尊！我不作是念：『我是離欲阿羅漢。』世尊！我若作是念，我得阿羅漢道，世尊則不說須菩提是樂阿蘭那行者，以須菩提實無所行，而名須菩提，是樂阿蘭那行。」",
      explanation: "佛說：「須菩提，你認為當人在修行須陀洹時，是否要預先思念自己得聲聞初果嗎？」須菩提回答說：「世尊！不會。初得聖果的人，不會起這樣的思念。為什麼呢？因為須陀洹的意思雖稱為入流卻無所入，因其不入色、聲、香、味、觸、法，所以才稱為須陀洹。」佛又說：「須菩提！你認為當人在修行斯陀含，會不會預先思念自己得聲聞第二果呢？」須菩提回答說：「世尊！不會。修行第二聖果的人，不會起這樣的思念。為什麼呢？因為斯陀含的心境，已達於至靜之處，雖然當時的修行還是一生一滅，所以稱之為一往來，實際上已無第二個生滅，心不著生滅之相，所以實無往來。」佛又說：「須菩提！你認為當人在修行阿那含時，會不會預先思念自己已得聲聞第三果呢？」須菩提回答說：「世尊！不會。修行第三聖果的人，不會起這樣的思念。為什麼呢？因為阿那含，心空無我，已斷塵識思惑，六塵四相，一一證空，而無不來之相。所以阿那含意思雖稱為不來，其實是永不來欲界受生的意思。」佛又說：「須菩提！你認為當人在修行阿羅漢時，會不會預先思念自己已得聲聞第四果呢？」須菩提回答說：「世尊！不會。修行第四聖果的人，不會起這樣的思念。為什麼呢？因為阿羅漢已心空相俱滅。既無得道之念，也沒有得果之念，不再感受未來的生死，並不是另外有個實在的自性法，可以稱之為阿羅漢。如果阿羅漢自念得道，即著四相，就不能叫做阿羅漢了。世尊！您曾經這樣說過我：說我遠離一切著相、取相的分別，遠離一切是非，契合真理，已到奧妙之處。在諸弟子中，讚許我為解空第一。是第一個脫盡人我，斷絕此念，離欲的阿羅漢。世尊！我雖蒙師父您如此的稱讚，我確實沒有得了阿羅漢的念頭。世尊！我若有得了阿羅漢的念頭，便是生了妄念，又如何得到六欲皆空的阿羅漢。如果是這樣，您就不會說我是好寂靜的阿蘭那行者，因為我心原無所得，亦無所行，只因本分上一塵不染，以此得名須菩提而已。所以師父您才稱讚我是好寂靜之行者。」"
    },
    {
      id: 10,
      title: "莊嚴淨土分第十",
      content: "佛告須菩提：「於意云何？如來昔在然燈佛所，於法有所得不？」「不也，世尊！如來在然燈佛所，於法實無所得。」「須菩提！於意云何？菩薩莊嚴佛土不？」「不也。世尊！何以故？莊嚴佛土者，即非莊嚴，是名莊嚴。」「是故，須菩提！諸菩薩摩訶薩，應如是生清淨心，不應住色生心，不應住聲、香、味、觸、法生心，應無所住，而生其心。須菩提！譬如有人，身如須彌山王，於意云何？是身為大不？」須菩提言：「甚大。世尊！何以故？佛說非身，是名大身。」",
      explanation: "佛說：「須菩提！你認為以前我在與然燈佛會晤時，從他那兒有沒有得法呢？」須菩提回答說：「世尊！您在與然燈佛會晤時，是自修自悟，於法實無所得。」佛又說：「須菩提！你認為菩薩發心從事莊嚴佛土，是不是真的有佛土可莊嚴呢？」須菩提回答說：「不是。世尊！為什麼呢？因為你所說的莊嚴，不是形相莊嚴，不過假藉莊嚴之名而已。」佛又說：「就因為如此，須菩提！所以諸菩薩、摩訶薩應該像這樣一心不亂，生清淨心，不可執著在色聲香味觸法之上生意念。否則便受六塵所蒙蔽、所束縛，妄念旋起，怎麼能清淨呢？原來清淨心，本無所住的。須菩提！譬如有人，其身如須彌山王，你認為他的身形是否很大？」須菩提回答說：「非常大。世尊！但是此人身形雖大，不能稱為大身。為什麼呢？因為他的身形再大，也是有生有滅，終受輪迴；而師父您前面說的非相法身，乃是清淨本心，是真法身，此心包廓太虛，周藏法界，無相無住，豈是須彌山所能比量的嗎？這只不過假藉一個名，稱之為大身而已。」"
    },
    {
      id: 11,
      title: "無為福勝分第十一",
      content: "「須菩提！如恆河中所有沙數，如是沙等恆河，於意云何？是諸恆河沙，寧為多不？」須菩提言：「甚多。世尊！但諸恆河，尚多無數，何況其沙？」「須菩提！我今實言告汝，若有善男子、善女人，以七寶滿爾所恆河沙數三千大千世界，以用布施，得福多不？」須菩提言：「甚多。世尊！」佛告須菩提：「若善男子、善女人，於此經中，乃至受持四句偈等，為他人說，而此福德，勝前福德。」",
      explanation: "佛說：「須菩提！如用恒河中所有的沙數來作比喻，以一粒沙比喻一條恒河，那麼所有恒河內的所有沙，難道你認為不多嗎？」須菩提回答說：「非常多。世尊！以一沙各代表一恒河，河尚且就有無數多，何況是所有河中的所有沙呢！」佛又說：「須菩提，我實在告訴你，若有善男子或善女人，以一粒沙當作一個世界，用充滿如恒河沙數那麼多的三千大千世界的七寶來布施，那他所得的福德多不多？」須菩提回答說：「當然很多。世尊！」佛又告訴須菩提說：「若有善男子或善女子，為他人說及此經，甚至只是受持四句偈、四句等，而這個法施所得的福德又勝過前面用七寶布施所得的福德來得多了。」"
    },
    {
      id: 12,
      title: "尊重正教分第十二",
      content: "復次：「須菩提！隨說是經，乃至四句偈等，當知此處，一切世間天、人、阿修羅，皆應供養，如佛塔廟。何況有人，盡能受持、讀誦。須菩提！當知是人，成就最上第一希有之法；若是經典所在之處，即為有佛，若尊重弟子。」",
      explanation: "佛再進一步的說：「須菩提！若有人隨便在什麼地方，演講此經，甚而至少只說四句偈、四句等，使那些聽到說經的人，消除妄念。應該知道遇到說此經的處所是十分難得的，一切世間的天、人、鬼神等對於此處，皆應恭敬供養，作禮散花，如供養佛的塔廟一般。何況是那種人能完全受持讀誦般若經典，當然是格外值得尊敬了。須菩提！你可知這種人就是成就世上第一希有的無上菩提法。因般若能趨於無上菩提，世間沒有一法可與般若相比的，正因為如此，所以若是般若經典所在之處，即如有佛在，可以說得與佛弟子三寶同居，亦要宛如對佛弟子一樣的尊重。」"
    },
    {
      id: 13,
      title: "如法受持分第十三",
      content: "爾時，須菩提白佛言：「世尊！當何名此經？我等云何奉持？」佛告須菩提：「是經名為金剛般若波羅蜜，以是名字，汝當奉持。所以者何？須菩提！佛說般若波羅蜜，即非般若波羅蜜，是名般若波羅蜜。須菩提！於意云何？如來有所說法不？」須菩提白佛言：「世尊！如來無所說。」「須菩提！於意云何？三千大千世界所有微塵，是為多不？」須菩提言：「甚多。世尊！」「須菩提！諸微塵，如來說非微塵，是名微塵。如來說世界非世界，是名世界。須菩提，於意云何？可以三十二相見如來不？」「不也。世尊！不可以三十二相得見如來。何以故？如來說三十二相，即是非相，是名三十二相。」「須菩提！若有善男子、善女人，以恆河沙等身命布施，若復有人，於此經中，乃至受持四句偈等，為他人說，其福甚多！」",
      explanation: "那個時候，須菩提對佛稟白說：「世尊！此經應該取一個什麼名字？我們應該怎樣受持奉行此經呢？」佛就告訴須菩提說：「此經就取名為金剛般若波羅蜜，你們應當依法奉持。為什麼取這個名字呢？須菩提！我所說的般若波羅蜜，是妙覺本性，空如太虛。本體既然是虛無，那裡還會有什麼名字。不過恐怕人生斷見，不得已勉強取個『金剛般若波羅蜜』的名稱，為便於眾弟子奉持而已。須菩提！你認為我對此有所說法嗎？」須菩提回答說：「世尊！般若是在於自性自悟，既無可名之名，我師父就無所說。」佛又說：「須菩提！你認為三千大千世界裡所有的微塵多不多？」須菩提回答說：「甚多。世尊！」佛又說：「須菩提！微塵雖多，但皆無自性，悉假因緣而有。凡是因緣的，必然是空的，所以因其原無實性，所以說是非微塵，只不過假藉個名，稱為微塵而已。同樣的道理，我說世界雖大，然一切劫盡則壞，也是虛空不實的，只不過假藉個名，稱為世界而已。」佛又說：「須菩提！你認為可以以三十二相見如來嗎？」須菩提回答說：「不可以，世尊！不可以三十二相見如來。為什麼呢？因為您所說的三十二相，是屬於因緣假合，亦即隨著眾生的妄心所現的假相，根本沒有它的實在自相可得，也是假藉個名稱為三十二相而已。」佛又再提醒說：「須菩提！若有善男子或善女人，以相等恒河沙的生命來布施眾生，以犧牲生命來布施以求福德。再說假如有另一種人，演說此經，甚而至少只說四句偈、四句等，他持經布施所得的福，還是比前面說的捨身布施的福更多了。」"
    },
    {
      id: 14,
      title: "離相寂滅分第十四",
      content: "爾時，須菩提聞說是經，深解義趣，涕淚悲泣，而白佛言：「希有！世尊。佛說如是甚深經典，我從昔來所得慧眼，未曾得聞如是之經。世尊！若復有人得聞是經，信心清淨，即生實相。當知是人成就第一希有功德。世尊！是實相者，則是非相，是故如來說名實相。世尊！我今得聞如是經典，信解受持不足為難，若當來世後五百歲，其有眾生，得聞是經，信解受持，是人則為第一希有。何以故？此人無我相、人相、眾生相、壽者相，所以者何？我相，即是非相；人相、眾生相、壽者相，即是非相。何以故？離一切諸相，則名諸佛。」佛告須菩提：「如是，如是！若復有人，得聞是經，不驚、不怖、不畏，當知是人，甚為希有。何以故？須菩提！如來說第一波羅蜜即非第一波羅蜜，是名第一波羅蜜。須菩提！忍辱波羅蜜，如來說非忍辱波羅蜜，是名忍辱波羅蜜。何以故？須菩提！如我昔為歌利王割截身體，我於爾時，無我相、無人相、無眾生相，無壽者相。何以故？我於往昔節節支解時，若有我相、人相、眾生相、壽者相，應生瞋恨。須菩提！又念過去於五百世，作忍辱仙人，於爾所世，無我相、無人相、無眾生相、無壽者相。是故，須菩提！菩薩應離一切相，發阿耨多羅三藐三菩提心，不應住色生心，不應住聲、香、味、觸、法生心，應生無所住心。若心有住，即為非住。是故佛說菩薩心，不應住色布施。須菩提！菩薩為利益一切眾生故，應如是布施。如來說一切諸相，即是非相；又說一切眾生，即非眾生。須菩提！如來是真語者、實語者、如語者、不誑語者、不異語者。須菩提！如來所得此法，此法無實無虛。須菩提！若菩薩心住於法，而行布施，如人入闇，則無所見。若菩薩心不住法，而行布施，如人有目日光明照，見種種色。須菩提！當來之世，若有善男子、善女人，能於此經受持、讀誦，則為如來，以佛智慧，悉知是人，悉見是人，皆得成就無量無邊功德。」",
      explanation: "那時，須菩提聽如來佛說到這裡，心中已經深悟佛理旨趣，頗為感動的流下淚來。不禁向如來佛讚嘆了一聲：「希有的世尊！您所說這個深奧的經典，即使在從前，我雖具有慧眼，也能一聞千悟，卻是未曾聽得如此深奧的經。我既聞此經，自性清淨中，已悟有本來全真的實相。如果有人，得聞此經，而信心純正清淨，毫無塵念。而生般若真實之實相，就可知道這種人，是非常難得，是成就第一希有功德的人。但是，世尊！究竟這般若實相，就是諸法空相，不是一般所說實物，但為引導眾生離開執著而找回本心，不得不假藉一個名，稱之為實相而已。世尊，此經我聽到這裡，已能了解其中的妙理，信奉修持，應該不是難事。倘若後世過五百年之後，是濁世末法的時候，離開師父您的時期已遠的苦海茫茫眾生，聽到此經而能信解受持的人，則此人真的是明了自性的第一人，實在難得。為什麼呢？因為這個人頓悟真空，必無我相、人相、眾生相、壽者相，就因為他已經了悟我相即是非相，人相、眾生相、壽者相也是非相，所以能夠離一切相，其心滅寂，就可以稱之為佛。」佛告訴須菩提說：「對的！你這樣說是對的。當知後世如果有人，聽到般若之妙法而不驚駭、不恐怖、不畏懼，這種人實在是很少有的。為什麼呢？須菩提！這就是我所謂的第一波羅蜜，此人的智慧已到彼岸了。不過修持的人卻不可以對彼岸有所執著，不過為了要引導眾生修持，特別給予一個名稱，稱之為第一波羅蜜而已。須菩提！再說到忍辱波羅蜜，凡辱境之來，恬然處之，不生忿怒即是忍辱波羅蜜，但真空本來無相，外不見其辱，內不見其忍，渾然兩忘，切勿執著於忍辱，所以我說非忍辱波羅蜜，只是為便於眾生修持，特別給予一個名稱，稱之為忍辱波羅蜜。為什麼呢？須菩提！就好比我的前生，被歌利王支解身體的時候，確實無我相、人相、眾生相、壽者相，否則當時我在被支解時，如果著有四相，必定心生忿恨，必成苦果。須菩提，我又想起過去的前五百世，做忍辱仙人修忍辱之行時，就已離我人眾生壽者四相，由歷劫頓悟真空，可知吾人所修行的，決不是一朝一夕所成的。所以說，須菩提！菩薩之修行，首當空其心，離一切相，方能發無上正等正覺的菩提心。此心中不執著於色，不執著於聲、香、味、觸、法，應生無所住心，此心才能圓通無礙。若於六塵中，一有執著，便不能解脫其住心，即非菩薩的住處。所以我說，菩薩心本來是虛而明，若住於六塵就不能覺悟，我所謂的不應住色布施，原因就在於此。須菩提！菩薩不住色布施，發心廣大，不是為己，是為有利於一切眾生，應該要如此無相布施。而我所說的一切諸相，原是指點諸菩薩解脫的，其實真寶的本體皆是空的，原是非相。而一切眾生，也是引導諸菩薩滅度而已，其實若見本性，妄心自離而入佛境，那麼一切眾生也就不是眾生了。須菩提！我所說的般若波羅蜜，皆是無上的菩提，是真而不妄、實而不虛、如常不變，不是欺人的，也沒有兩種說法。須菩提！我所說的般若之法，是真如無相，無實性；是自性自足、無虛的。須菩提！如果菩薩是一心執著於法而行布施，則是未離四相，有如人進入暗室，一無所見。如果菩薩心不執著於法而行布施，則如同人張開眼時，日光四照，見種種色；其心洞澈真空，可了一切之境。須菩提！當我滅後，到了後世，若有善男子或善女人，能於此經，受持讀誦，即到菩提之覺位，成自性之如來，我當知此人，也必以無上智慧照鑒之。而此人成就見性的功德，是無量無邊的。」"
    },
    {
      id: 15,
      title: "持經功德分第十五",
      content: "「須菩提！若有善男子、善女人，初日分以恆河沙等身布施；中日分復以恆河沙等身布施；後日分亦以恆河沙等身布施，如是無量百千萬億劫，以身布施。若復有人，聞此經典，信心不逆，其福勝彼。何況書寫、受持、讀誦、為人解說。須菩提！以要言之，是經有不可思議，不可稱量，無邊功德，如來為發大乘者說，為發最上乘者說，若有人能受持、讀誦、廣為人說，如來悉知是人、悉見是人，皆得成就不可量、不可稱、無有邊、不可思議功德，如是人等，即為荷擔如來阿耨多羅三藐三菩提。何以故？須菩提！若樂小法者，著我見、人見、眾生見、壽者見，則於此經不能聽受、讀誦、為人解說。須菩提！在在處處，若有此經，一切世間，天、人、阿修羅所應供養，當知此處，則為是塔，皆應恭敬，作禮圍遶，以諸華香而散其處。」",
      explanation: "佛說：「須菩提！若有善男子或善女人，於一日之間，早晨以相當於恒河沙數的身命布施，中午又以相當於恒河沙數的身命布施，晚上也以相當於恒河沙數的身命布施。如此經百千萬億劫之久，一日三次皆如此布施，自當得布施之福。如果有人，聽說此經，而能篤信不違逆，那麼他所得的福德則勝過前面說的以身命布施的人。何況是手書口誦，為人解說此經的意義，不但明自性，還要使人人見性，善根純熟，其所得的福德之無量，更不用說了。須菩提！簡而言之，因為此經所得的福德不以心思口議，不可以多少稱量，實是無邊際的功德。而此經在於讓我們妙用本性，是大乘菩薩的最上乘，所以我為啟發大乘人，說明此真空之妙；為啟發最上乘的人，說明此般若之法。如有大慧根的人，持此大乘經典，廣為人闡發妙旨，印契佛旨，所成就之功德，我全部知道，也全都看得到。這種人既能成就此功德，就足以能擔任如來無上菩提正法。這就是為什麼喜好小乘法的人，局於妄心，不免執著於我、人、眾生、壽者等私見，對此大乘最上乘法，不能理解，不能聽受讀誦，更不能為人解說此經。須菩提！無論是什麼人，在什麼地方，講解此經，那麼無論天、人、鬼神都會齊來護衛法身，皆來供養。當知此經所在之處，即等於是佛塔的地方。皆應尊敬法身，作禮圍繞，並帶香花來此處供奉。」"
    },
    {
      id: 16,
      title: "能淨業障分第十六",
      content: "復次：「須菩提！善男子、善女人，受持、讀誦此經，若為人輕賤，是人先世罪業，應墮惡道。以今世人輕賤故，先世罪業，則為消滅，當得阿耨多羅三藐三菩提。須菩提！我念過去無量阿僧祇劫，於然燈佛前，得值八百四千萬億那由他諸佛，悉皆供養承事，無空過者。若復有人，於後末世，能受持、讀誦此經，所得功德，於我所供養諸佛功德，百分不及一，千萬億分，乃至算數譬喻所不能及。須菩提！若善男子、善女人，於後末世，有受持、讀誦此經，所得功德，我若具說者，或有人聞，心則狂亂，狐疑不信。須菩提！當知是經義不可思議，果報亦不可思議。」",
      explanation: "佛再進一步說明：「須菩提！若有善男子或善女人，受持讀誦此經，不但不得天人恭敬，卻被人輕賤。為什麼呢？是因為他在前世所種的罪業。既有罪業，則來世應該墮入地獄、惡鬼、畜生三惡道中，受盡苦難。而今以持經功德，減輕他的罪業；其所以被人輕賤，就可以相抵消。不過他漸漸修持，因除果現，罪滅福生，依然可得無上正等正覺。須菩提！我想到前世，歷經了無數無量的劫數。在未遇然燈佛前，曾供養無數量佛，且尊重每一位佛都一樣，無一不全心全意的供養。如果後人持誦此經，見自本性，永離輪迴，他持經所得的功德，比我以前供佛的功德，還勝過無數倍。須菩提！若善男子或善女人於後末世，受持讀誦此經，必得無量之功德。此功德我只是約略而言，我如果要詳細說明，則其多有如恒河沙數說不盡，恐怕慧根淺的人，大則誑亂，小則狐疑，反以為我所說的為怪談滑稽之談。須菩提！當知功德，由於經義，應於果報。經義甚深，不可推測；果報甚重，不可思議。」"
    },
    {
      id: 17,
      title: "究竟無我分第十七",
      content: "爾時，須菩提白佛言：「世尊，善男子、善女人，發阿耨多羅三藐三菩提心，云何應住？云何降伏其心？」佛告須菩提：「善男子、善女人，發阿耨多羅三藐三菩提心者，當生如是心：我應滅度一切眾生；滅度一切眾生已，而無有一眾生實滅度者，何以故？須菩提若菩薩有我相、人相、眾生相、壽者相，則非菩薩。所以者何？須菩提！實無有法，發阿耨多羅三藐三菩提心者。須菩提！於意云何？如來於然燈佛所，有法得阿耨多羅三藐三菩提不？」「不也。世尊！如我解佛所說義，佛於然燈佛所，無有法得阿耨多羅三藐三菩提。」佛言：「如是！如是！須菩提！實無有法，如來得阿耨多羅三藐三菩提。須菩提！若有法如來得阿耨多羅三藐三菩提者，然燈佛即不與我授記：『汝於來世當得作佛，號釋迦牟尼。』以實無有法，得阿耨多羅三藐三菩提，是故然燈佛與我授記，作是言：『汝於來世，當得作佛，號釋迦牟尼。』何以故？如來者，即諸法如義。若有人言：如來得阿耨多羅三藐三菩提，須菩提！實無有法，佛得阿耨多羅三藐三菩提。須菩提！如來所得阿耨多羅三藐三菩提，於是中無實無虛。是故如來說一切法，皆是佛法。須菩提！所言一切法者，即非一切法，是故名一切法。須菩提！譬如人身長大。」須菩提言：「世尊！如來說人身長大，則為非大身，是名大身。」「須菩提！菩薩亦如是。若作是言：『我當滅度無量眾生。』則不名菩薩。何以故？須菩提！實無有法，名為菩薩。是故佛說：『一切法，無我、無人、無眾生、無壽者。』須菩提！若菩薩作是言：『我當莊嚴佛土。』是不名菩薩。何以故？如來說莊嚴佛土者，即非莊嚴，是名莊嚴。須菩提！若菩薩通達無我法者，如來說名真是菩薩。」",
      explanation: "那時，須菩提當機稟白佛說：「善男子或善女人已發菩提心的人，如何能常保持這菩提心？又如何能降伏妄念心呢？」佛告訴須菩提說：「菩提心本來人人都具足，只因眾生為塵染所蒙蔽，如一切煩惱、妄想、取捨、貪瞋、嫉妒、人我四相等，佛等應一一為之滅度，所謂無欲，就能住心，亦能降伏妄心。我所謂滅度者，不過指點出真性情，使之自悟，我外不見所愛之眾生，內不見能度之我。而眾生既見性真，則般若觀照，已常住不滅，說到究竟，實無一眾生是我所滅度的。為什麼呢？因為學道的菩薩，若存有滅度眾生之心，則尚存有人我四相，則又要從何發菩提心，又如何能稱為菩薩呢？這又是為什麼呢？須菩提！原因就是性本空寂，發此心的人，不過是自修自悟而成，而在真性中，實在沒有發菩提心之法。」佛又說：「須菩提！你認為我在遇見然燈佛時，有沒有從他那兒學得菩提心法？」須菩提回答說：「沒有。世尊！沒有法可得菩提心，因為菩提心完全是自性自悟，雖在然燈佛所，也是無法可得菩提心法。」佛說：「是的。須菩提！誠如你所說的，實在無法可得無上正等正覺的菩提心。須菩提！如果說有方法可得菩提心，那麼然燈佛就不會為我授記，當下就應該傳授我成佛之法。他所以才懸記來世說我方能成佛，並預定來世成佛之名號，稱之為釋迦牟尼。為什麼呢？因為如來的意思，就是本性寂然，不染不著，如其本來，而以釋迦牟尼稱之，最能合其意。如果有人說：如來已得無上正等正覺的菩提心，那就錯了。須菩提！就因為實在沒有方法可得此菩提心。須菩提！我所謂的菩提心，是平等真如，實相妙法，不可以有形相見，乃是無實無虛，不可以言語形容，所以我說一切法中，只要能自悟真如，都可稱之為佛法。但是，須菩提！於法不可拘泥於有無，所稱的一切法，實際上並非是一切法，只是假藉一個名，稱之為一切法而已。須菩提！譬如有個人的身體高而且大，真的是大身嗎？」須菩提回答說：「您所說的大身，是有生有滅的，仍是有限量的，如何能稱之為大身？不過假藉一個名，稱之為大身而已。」佛又說：「須菩提！菩薩也是如此，真如清淨才稱之為菩薩。而度生本是菩薩份內的事，如果他執著一念，認為他是菩薩，應該滅度一切眾生，便有我相的觀念，就不能稱之為菩薩。為什麼呢？因為從發心到度生，沒有不是緣成幻成的，實在無法可以得到而使之成為菩薩的，所以我說，一切法中沒有我相、人相、眾生相、壽者相，則一切法自然都是佛法。須菩提！如果菩薩說：我應當莊嚴整飾佛的剎土，也是著於相，不可稱之為菩薩。為什麼呢？因為所謂莊嚴佛土，是沒有能莊嚴的人及能莊嚴的法，亦即沒有實性的莊嚴佛土可言，只是假借一個名，稱之為莊嚴而已。須菩提！若菩薩能大徹大悟，通達無我無法的人，即可以稱之為菩薩。」"
    },
    {
      id: 18,
      title: "一體同觀分第十八",
      content: "「須菩提！於意云何？如來有肉眼不？」「如是，世尊！如來有肉眼。」「須菩提！於意云何？如來有天眼不？」「如是，世尊！如來有天眼。」「須菩提！於意云何？如來有慧眼不？」「如是，世尊！如來有慧眼。」「須菩提！於意云何？如來有法眼不？」「如是，世尊！如來有法眼。」「須菩提！於意云何？如來有佛眼不？」「如是，世尊！如來有佛眼。」「須菩提！於意云何？如恆河中所有沙，佛說是沙不？」「如是，世尊！如來說是沙。」「須菩提！於意云何？如一恆河中所有沙，有如是沙等恆河，是諸恆河所有沙數，佛世界如是，寧為多不？」「甚多。世尊！」佛告須菩提：「爾所國土中，所有眾生若干種心，如來悉知。何以故？如來說諸心，皆為非心，是名為心。所以者何？須菩提！過去心不可得，現在心不可得，未來心不可得。」",
      explanation: "佛說：「須菩提！你認為我具有肉眼嗎？」須若提回答說：「是的，世尊！您具有肉眼。」佛說：「須菩提！你認為我具有天眼嗎？」須菩提回答說：「是的，世尊！您具有天眼。」佛說：「須菩提！你認為我具有慧眼嗎？」須菩提回答說：「是的，世尊！您具有慧眼。」佛說：「須菩提！你認為我具有法眼嗎？」須菩提回答說：「是的，世尊！您具有法眼。」佛說：「須菩提！你認為我具有佛眼嗎？」須菩提回答說：「是的，世尊！您具有佛眼。」佛又說：「須菩提！你認為在恒河中所有的沙，我是不是說它是沙呢？」須菩提回答說：「是的，世尊！您說它是沙。」佛說：「那麼，須菩提f如一恒河中所有的沙，如果以其中一粒沙比作一恒河，再以所有恒河中的所有沙，以一粒沙比作一佛世界，你認為這樣的佛世界難道不多嗎？」須菩提回答說：「非常多。世尊！」佛告訴須菩提說：「不必遠說到那麼多的佛世界，就拿你所處的世界來說，所有眾生的心思，隨情而遷，逐境而生，種種心思顛倒妄想，我卻能以清淨的五眼完全看得見，完全知道。為什麼呢？因為所有這些心思，皆是眾生的妄心，並非本性常住的真心，只是假藉一個名，稱之為心罷了。這又為什麼呢？須菩提！常住的真心是寂然不動的，過去的心思不可滯留，現在心思不可執著，未來的心思又不可預期，反觀內照，則三心總不可得。知其不可得，則清淨的般若才會顯出，所謂人心淨而道心生，此方為菩提的真心。」"
    },
    {
      id: 19,
      title: "法界通化分第十九",
      content: "「須菩提！於意云何？若有人滿三千大千世界七寶，以用布施，是人以是因緣，得福多不？」「如是，世尊！此人以是因緣，得福甚多。」「須菩提！若福德有實，如來不說得福德多，以福德無故，如來說得福德多。」",
      explanation: "佛說：「須菩提！如果有人用充滿三千大千世界的七寶來行布施，你認為此人因所播的因緣而得來的福德多不多？」須菩提回答說：「是的，世尊！此人以這種布施因緣所得的福德非常多。」佛又說：「須菩提！若以有實相的因緣布施，因其心執著於福報，其福報亦因其所施的因緣有限而有時盡的，所以我說他因此所得的福德不多，如果以無住實相布施，以無求福之心布施，正是無為清淨之功德，我說此種福德才是真正的無限。」"
    },
    {
      id: 20,
      title: "離色離相分第二十",
      content: "「須菩提！於意云何？佛可以具足色身見不？」「不也，世尊！如來不應以具足色身見。何以故？如來說具足色身，即非具足色身，是名具足色身。」「須菩提！於意云何？如來可以具足諸相見不？」「不也，世尊！如來不應以具足諸相見。何以故？如來說諸相具足，即非諸相具足，是名諸相具足。」",
      explanation: "佛說：「須菩提！你認為所謂的佛陀，可不可以用圓滿的色身來觀察嗎？」須菩提回答說：「不可以。世尊！如來不可以用圓滿的色身來觀察。為什麼呢？因為您所說的具足色身，雖有三十二相，變化神通，但仍是緣起而非實相，只是假借一個名，稱之為具足色身。」佛又說：「須菩提！你認為我可不可以用圓滿具足諸相來觀察？」須菩提回答說：「不可以。世尊！您不可以用圓滿具足諸相來觀察。為什麼呢？因為您所說的圓滿諸相，亦是緣起而無自性的，只是假借一個名，稱之為具足諸相而已。」"
    },
    {
      id: 21,
      title: "非說所說分第二十一",
      content: "「須菩提！汝勿謂如來作是念：我當有所說法。莫作是念！何以故？若人言如來有所說法，即為謗佛，不能解我所說故。須菩提！說法者，無法可說，是名說法。」爾時，慧命須菩提白佛言：「世尊！頗有眾生，於未來世，聞說是法，生信心不？」佛言：「須菩提！彼非眾生，非不眾生。何以故？須菩提！眾生，眾生者，如來說非眾生，是名眾生。」",
      explanation: "佛說：「須菩提！你不要以為我會作這樣想：『我當為眾生說種種法』，因為我只是機緣相感，隨人悟性，為之指點，未嘗有說法之念頭。你切勿有以為我應當說法的念頭。為什麼呢？如果有人說：『如來有所說法。』他這麼說，即是毀謗佛，是他拘泥於文字，不能了解我所說的道理，才會這麼說。須菩提！所謂說法的意思，不是假於口說就能盡的，佛的真空妙理，原來無法，只不過為眾生解除外邪妄心而說的，使之了悟真性，自證佛理，此乃假藉一個名，稱之為說法而已，實際上我並沒有說法。」那時，須菩提向如來佛稟白說：「世尊！恐怕未來世的諸眾生，聽到這個無法之法，無說之說，不能完全了解，不知能否生信心。」佛回答說：「須菩提！眾生本來各具有佛性，所以說他們非眾生，但他們尚未解脫妄心，所以也不是非眾生。為什麼呢？須菩提！因為眾生之所以為眾生，只是尚未了悟，如果能了悟，即可立地成佛，而非為眾生，現在不過先假借一個眾生之名稱之而已。」"
    },
    {
      id: 22,
      title: "無法可得分第二十二",
      content: "須菩提白佛言：「世尊！佛得阿耨多羅三藐三菩提，為無所得耶？」佛言：「如是！如是！須菩提！我於阿耨多羅三藐三菩提，乃至無有少法可得，是名阿耨多羅三藐三菩提。」",
      explanation: "須菩提向如來佛稟問說：「世尊！您得正等正覺菩提心，真是得無所得嗎？」佛回答說：「正是！你說正合我的意思。須菩提！我於菩提正法，絲毫都無所得。因為凡是可以用得失來衡量的，都是身外之物，而不是自性的。自性菩提，人人具足，如何能得，也無法可得，只是假借一個名，稱之為無上正等正覺而已。」"
    },
    {
      id: 23,
      title: "淨心行善分第二十三",
      content: "復次：「須菩提！是法平等，無有高下，是名阿耨多羅三藐三菩提。以無我、無人、無眾生、無壽者，修一切善法，則得阿耨多羅三藐三菩提。須菩提！所言善法者，如來說即非善法，是名善法。」",
      explanation: "佛再進一步地說明：「須菩提！我所說的無上正等正覺之法，是人人具足，世世相同，故曰平等，佛與眾生所具有的菩提心，亦沒有高下，所以才稱之為無上正等正覺菩提。因為在真性中，原本無我、無人、無眾生、無壽者等四相，如有此四相，則是受浮塵妄念所蒙蔽。所以能修明心見性的一切善法，就可以得無上菩提。須菩提！我所謂的善法，乃本性中自然的覺性，原本就無善惡，只因為了開悟眾生，假藉一個名，稱之為善法而已。」"
    },
    {
      id: 24,
      title: "福智無比分第二十四",
      content: "「須菩提！若三千大千世界中，所有諸須彌山王，如是等七寶聚，有人持用布施。若人以此般若波羅蜜經，乃至四句偈等，受持、讀誦，為他人說，於前福德，百分不及一，百千萬億分，乃至算數譬喻所不能及。」",
      explanation: "佛說：「須菩提！如果有人以相當於三千大千世界所有的須彌山堆積起來的七寶來行布施；如果另外有人受持這個般若波羅蜜經，甚至只是少至其中的四句偈、四句等來為人演說，則前者以七寶布施所得的福德比不上後者所得福德的百千萬億分之一，甚至是不能用算數的譬喻所能算的。」"
    },
    {
      id: 25,
      title: "化無所化分第二十五",
      content: "「須菩提！於意云何？汝等勿謂如來作是念：『我當度眾生。』須菩提！莫作是念！何以故？實無有眾生如來度者。若有眾生如來度者，如來即有我、人、眾生、壽者。須菩提！如來說有我者，則非有我，而凡夫之人，以為有我。須菩提！凡夫者，如來說則非凡夫，是名凡夫。」",
      explanation: "佛說：「須菩提！你知道嗎？你們不要以為，我在度化眾生時，會有『我應當度化眾生』的念頭。須菩提！你切勿有這種想法。為什麼呢？因為眾生之心，本來空寂，其般若智慧，原本各自具足。如果他們聞經悟道，他們自可化度自己，實在沒有眾生被我度化的。若有眾生說是由我所度化的，那麼我即有我相、人相、眾生相、壽者相，自己尚未度化，如何度化別人？須菩提！我雖口稱有我，實際上卻無我見，而在凡夫看來，則執著有我，以為只有我能度化他們。須菩提！事實上，迷則為凡夫，悟則成佛，佛與凡夫，本性是相同的，只要能了悟，就不是凡夫，不過在他們未悟時，稱之為凡夫而已。」"
    },
    {
      id: 26,
      title: "法身非相分第二十六",
      content: "「須菩提！於意云何？可以三十二相觀如來不？」須菩提言：「如是！如是！以三十二相觀如來。」佛言：「須菩提！若以三十二相觀如來者，轉輪聖王即是如來。」須菩提白佛言：「世尊！如我解佛所說義，不應以三十二相觀如來。」爾時，世尊而說偈言：「若以色見我，以音聲求我，是人行邪道，不能見如來。」",
      explanation: "佛說：「須菩提！你認為我如來可以用三十二相來觀察嗎？」須菩提回答說：「是的！您是可以三十二相來觀察。」佛因為須菩提尚未明白其中的深義，於是說：「須菩提！轉輪聖王，因以福業厚重，亦具有三十二相色身，若我也可以用此三十二相來觀察，那麼轉輪聖王豈不就可以成為如來了嗎？」須菩提聞言立即稟白佛說：「世尊！我已了解您所說的道理，您是不可以用三十二相來觀察。」這個時候，如來看時機已成熟，可以告誡他們離相的偈言如下：「你們如果只見我的形色外表，或是只是執著我的聲教，欲以此二者求見我的真性，那麼這種人，只是執於色身四相見佛。便是捨去正途，不知即心即是佛。而向外馳求的人是人行外道，決不能見如來真正的面目。」"
    },
    {
      id: 27,
      title: "無斷無滅分第二十七",
      content: "「須菩提！汝若作是念：『如來不以具足相故，得阿耨多羅三藐三菩提。」須菩提！莫作是念：『如來不以具足相故，得阿耨多羅三藐三菩提。』須菩提！汝若作是念，發阿耨多羅三藐三菩提心者，說諸法斷滅。莫作是念！何以故？發阿耨多羅三藐三菩提心者，於法不說斷滅相。』",
      explanation: "佛一再地說無相，只是教人離相，不是教人滅相。所以說：「須菩提！你如果是這樣想：如來是因為不具圓滿的三十二相的緣故，才證得無上菩提，那你就錯了。須菩提！你千萬不可有這種想法，以為我是因為不具圓滿的三十二相才得證無上菩提。須菩提！你如果也這樣想，發無上菩提心，想證得無上菩提，而執於一切皆空，而誤以為不因修福，而可直證菩提。錯是錯在說諸法斷滅，你不可以有這種觀念。為什麼呢？因為發無上菩提心的，還是要從基本的修一切善法做起，只是可以不依佛法修行，乃在於勸勉修行的人勿執著於法，只是離法而行，不是滅法而不行的。」"
    },
    {
      id: 28,
      title: "不受不貪分第二十八",
      content: "「須菩提！若菩薩以滿恆河沙等世界七寶，持用布施。若復有人，知一切法無我，得成於忍。此菩薩勝前菩薩所得功德。何以故？須菩提！以諸菩薩不受福德故。」須菩提白佛言：「世尊！云何菩薩，不受福德？」「須菩提！菩薩所作福德，不應貪著，是故說：不受福德。」",
      explanation: "佛說：「須菩提！若有菩薩雖以無量世界所有七寶行布施，因其心著於相，所以所得的福德雖多卻有限。如果另有菩薩，心不著於相，知一切法無我，得成無我之忍，以至忍而忘忍，無我始得以完成。如此則後面所說的菩薩，但所得的福德要勝過前面的菩薩多得多了。為什麼呢？須菩提！因為這些菩薩有離相之因，在布施時，就有不受福德的果，因其不受福德的緣故，則所得的福德就無限量了。」須菩提於是問說：「世尊！因果受施是理所當然，為何要說菩薩不受福德呢？」佛告訴他說：「須菩提！菩薩度生布施，本來是行所當行，不應貪求福德才行布施，福德之有或沒有，悉聽自然，所以才說菩薩不受福德。」"
    },
    {
      id: 29,
      title: "威儀寂靜分第二十九",
      content: "「須菩提！若有人言：『如來若來、若去；若坐、若臥。』是人不解我所說義。何以故？如來者，無所從來，亦無所去，故名如來。」",
      explanation: "佛說：「須菩提！如果有人說我如來有行、住、坐、臥四種威儀，也就以為我也著於相，是不了解我所說的道理。為什麼呢？因為如來的本性，是真性自如，充滿法界，隨感而發，來固非來，去亦非去。就因為無去無來，所以稱之為如來。」"
    },
    {
      id: 30,
      title: "一合理相分第三十",
      content: "「須菩提！若善男子、善女人，以三千大千世界碎為微塵；於意云何？是微塵眾，寧為多不？」須菩提言：「甚多。世尊！何以故？若是微塵眾實有者，佛則不說是微塵眾。所以者何？佛說微塵眾，即非微塵眾，是名微塵眾。世尊！如來所說三千大千世界，則非世界，是名世界。何以故？若世界實有者，即是一合相；如來說一合相，則非一合相，是名一合相。」「須菩提！一合相者，則是不可說，但凡夫之人，貪著其事。」",
      explanation: "佛說：「須菩提！若有善男子或善女人，將三千大千世界，搗碎成為微塵，你以為這些微塵難道不多嗎？」須菩提回答說：「非常多。世尊！為什麼呢？因為微塵雖多，但它的緣起是無性，絕不會執著它實有的自體。如果這些微塵是有實體的，那您就不會稱它們為微塵眾了。這是什麼緣故呢？因為您所說的微塵眾，也是緣起非真實的，只是假藉一個名，稱之為微塵眾而已。世尊！您所稱的三千大千世界，同樣也是緣起的假象，也是非真實性，也只是假藉一個名，稱之為世界而已。為什麼呢？如果有一真實性的世界，即是一合相，渾然成一體。不能被碎為微塵的。所以您說一合相亦非實有，只是假藉一個名，稱之為一合相而已。」佛說：「須菩提！一合相之理，空而不空，妙不可言喻。但凡夫蔽塞不明本性，依戀眼前幻境。六根著各相而不能了悟。」"
    },
    {
      id: 31,
      title: "知見不生分第三十一",
      content: "「須菩提！若人言：『佛說我見、人見、眾生見、壽者見。』須菩提！於意云何？是人解我所說義不？」「不也，世尊！是人不解如來所說義。何以故？世尊說我見、人見、眾生見、壽者見，即非我見、人見、眾生見、壽者見，是名我見、人見、眾生見、壽者見。」「須菩提！發阿耨多羅三藐三菩提心者，於一切法，應如是知、如是見、如是信解，不生法相。須菩提！所言法相者，如來說即非法相，是名法相。」",
      explanation: "佛說：「須菩提！若有人說：『佛說過我見、人見、眾生見、壽者見』這種話。須菩提！你認為這個人是否了解我所說的意思？」須菩提回答說：「沒有，世尊！」這個人並不了解您所說的意思。為什麼呢？因為您所說的這四見，只是為了凡夫便於了解佛的深意而說，事實上應該要超乎此四見之外，並非耍拘泥於其中而存此四見，所以只是為了便於說明，而假借一個名，稱之為我見、人見、眾生見、壽者見而已。」佛又說：「須菩提！凡是發無上正等正覺菩提心的，應如此認知，應如此為見，了悟無相妙理，自然行無相妙行，則知無所蔽，見無所障，如此信解。即為妙悟，而不生法相，至此才得真空無相之妙。須菩提！法相本是虛空的，即非法相；虛空中有幻相，所以才稱之為法相。」"
    },
    {
      id: 32,
      title: "應化非真分第三十二",
      content: "「須菩提！若有人以滿無量阿僧祇世界七寶，持用布施。若有善男子、善女人，發菩提心者，持於此經，乃至四句偈等，受持、讀誦，為人演說，其福勝彼。云何為人演說？不取於相，如如不動。何以故？一切有為法，如夢、幻、泡、影；如露，亦如電，應作如是觀。」",
      explanation: "佛說：「須菩提！若有人以充滿了無窮世界的七寶來行布施。此外，如果另有善男子或善女人，發了無上菩提心，受持讀誦此經，甚至少至以其中的四句偈、四句等，為人演說，使人悟性，那麼此人因此所得的福德勝過前面以七寶布施的人甚多。而受持此經要如何為人演說呢？必須要不著相，不動心。為什麼呢？因為世間，凡是有所為而成的法，都是生滅無常，如夢、如幻、如泡、如影、如露亦如電，凡屬有所為，終究是虛幻的，應該都視為有如此六種一般。」佛說是經已，長老須菩提，及諸比丘、比丘尼、優婆塞、優婆夷，一切世間天、人、阿修羅，聞佛所說，皆大歡喜，信受奉行。佛反覆闡明般若之法，至此已說解完畢。長老須菩提，與同時在法會聽經的諸僧人、女尼、善男、信女、及一切世間的天人鬼神等，聽完佛所說的般若大法，無不歡喜感化，信受其言，奉行其教。"
    },

  ];

  const nextSection = () => {
    if (currentSection < sutraSections.length) {
      setCurrentSection(currentSection + 1);
      setShowExplanation(false);
    }
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      setShowExplanation(false);
    }
  };

  // 分享功能
  const shareToSocialMedia = (platform: string) => {
    const message = "我正在使用金剛經App學習佛法，推薦給您！";
    const url = "https://apps.apple.com/app/diamond-sutra-app";
    
    let shareUrl = "";
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `whatsapp://send?text=${encodeURIComponent(message + ' ' + url)}`;
        break;
      case 'line':
        shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
        break;
    }
    
    if (shareUrl) {
      Linking.openURL(shareUrl).catch(() => {
        Alert.alert('錯誤', '無法打開分享連結');
      });
    }
  };

  const openAppStore = () => {
    const appStoreUrl = "https://apps.apple.com/app/diamond-sutra-app";
    Linking.openURL(appStoreUrl).catch(() => {
      Alert.alert('錯誤', '無法打開App Store');
    });
  };

  if (currentPage === 'home') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* 標題區域 */}
          <View style={styles.header}>
            <Text style={styles.mainTitle}>《金剛般若波羅蜜經》</Text>
            <Text style={styles.subTitle}>鳩摩羅什法師譯</Text>
          </View>

          {/* 按鈕區域 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#8B4513' }]}
              onPress={() => goToPage('pageReader')}
            >
              <Text style={styles.buttonText}>金剛經（翻頁版）</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#A0522D' }]}
              onPress={() => goToPage('longPageReader')}
            >
              <Text style={styles.buttonText}>金剛經（滾字版）</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#CD853F' }]}
              onPress={() => goToPage('dedication')}
            >
              <Text style={styles.buttonText}>迥向文</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#D2691E' }]}
              onPress={() => goToPage('settings')}
            >
              <Text style={styles.buttonText}>設定</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#B8860B' }]}
              onPress={() => goToPage('share')}
            >
              <Text style={styles.buttonText}>分享</Text>
            </TouchableOpacity>
          </View>

          {/* 底部裝飾 */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>願以此功德，普及於一切</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 迥向文頁面
  if (currentPage === 'dedication') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.dedicationContent}>
          {/* 返回按鈕 */}
          <TouchableOpacity style={styles.backButton} onPress={goHome}>
            <Text style={styles.backButtonText}>返回首頁</Text>
          </TouchableOpacity>

          {/* 迥向文內容 */}
          <View style={styles.dedicationTextContainer}>
            <Text style={styles.dedicationTitle}>迥向文</Text>
            <Text style={styles.dedicationText}>
              願以此功德，{'\n'}
              普及於一切，{'\n'}
              我等與眾生，{'\n'}
              皆共成佛道。
            </Text>
          </View>

          {/* 底部裝飾 */}
          <View style={styles.dedicationFooter}>
            <Text style={styles.footerText}>南無阿彌陀佛</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 設定頁面
  if (currentPage === 'settings') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.settingsContent}>
          {/* 返回按鈕 */}
          <TouchableOpacity style={styles.backButton} onPress={goHome}>
            <Text style={styles.backButtonText}>返回首頁</Text>
          </TouchableOpacity>

          {/* 設定標題 */}
          <Text style={styles.settingsTitle}>設定</Text>

          {/* 設定選項 */}
          <View style={styles.settingsContainer}>
            {/* 簡繁體切換 */}
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>簡繁體切換</Text>
              <View style={styles.settingControl}>
                <Text style={styles.settingValue}>{isTraditional ? '繁體' : '簡體'}</Text>
                <Switch
                  value={isTraditional}
                  onValueChange={setIsTraditional}
                  trackColor={{ false: '#767577', true: '#8B4513' }}
                  thumbColor={isTraditional ? '#f4f3f4' : '#f4f3f4'}
                />
              </View>
            </View>

            {/* 字體大小 */}
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>字體大小</Text>
              <View style={styles.settingControl}>
                <TouchableOpacity
                  style={styles.sizeButton}
                  onPress={() => setFontSize(Math.max(12, fontSize - 2))}
                >
                  <Text style={styles.sizeButtonText}>A-</Text>
                </TouchableOpacity>
                <Text style={styles.fontSizeDisplay}>{fontSize}pt</Text>
                <TouchableOpacity
                  style={styles.sizeButton}
                  onPress={() => setFontSize(Math.min(24, fontSize + 2))}
                >
                  <Text style={styles.sizeButtonText}>A+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 字體選擇 */}
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>字體選擇</Text>
              <View style={styles.settingControl}>
                <TouchableOpacity
                  style={styles.fontButton}
                  onPress={() => setSelectedFont('系統字體')}
                >
                  <Text style={[styles.fontButtonText, selectedFont === '系統字體' && styles.selectedFont]}>
                    系統字體
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.fontButton}
                  onPress={() => setSelectedFont('楷體')}
                >
                  <Text style={[styles.fontButtonText, selectedFont === '楷體' && styles.selectedFont]}>
                    楷體
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* 底部說明 */}
          <View style={styles.settingsFooter}>
            <Text style={styles.footerText}>設定會自動保存</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 金剛經（翻頁版）頁面
  if (currentPage === 'pageReader') {
    // 獲取當前分段的內容
    const currentSectionData = sutraSections[currentSection - 1];
    const currentSectionText = currentSectionData.content;
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.pageReaderContent}>
          {/* 頂部導航 */}
          <View style={styles.pageReaderHeader}>
            <TouchableOpacity style={styles.backButton} onPress={goHome}>
              <Text style={styles.backButtonText}>返回首頁</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>金剛經（翻頁版）</Text>
            <TouchableOpacity 
              style={[
                styles.bookmarkButton, 
                bookmarkedSection === currentSection && styles.bookmarkButtonActive
              ]} 
              onPress={toggleBookmark}
            >
              <Text style={[
                styles.bookmarkButtonText,
                bookmarkedSection === currentSection && styles.bookmarkButtonTextActive
              ]}>
                {bookmarkedSection === currentSection ? '已書籤' : '書籤'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 經文內容 */}
          <ScrollView style={styles.sutraContent} contentContainerStyle={styles.sutraContentContainer}>
            {/* 經文標題 */}
            <Text style={styles.sutraTitle}>{currentSectionData.title}</Text>
            
            <TouchableOpacity 
              style={styles.sutraTextContainer}
              onPress={() => setShowExplanation(!showExplanation)}
              activeOpacity={0.8}
            >
              <Text style={[styles.sutraText, { fontSize: fontSize }]}>
                {currentSectionText}
              </Text>
              

            </TouchableOpacity>

            {/* 經文解釋方塊 */}
            <TouchableOpacity 
              style={styles.explanationBox}
              onPress={() => setShowExplanation(!showExplanation)}
              activeOpacity={0.8}
            >
              <Text style={styles.explanationBoxTitle}>經文解釋</Text>
            </TouchableOpacity>

            {/* 解釋彈出框 */}
            {showExplanation && (
              <View style={styles.explanationOverlay}>
                <View style={styles.explanationModal}>
                  <View style={styles.explanationModalHeader}>
                    <Text style={styles.explanationModalTitle}>經文解釋</Text>
                    <TouchableOpacity onPress={() => setShowExplanation(false)}>
                      <Text style={styles.closeExplanationButton}>✕</Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView 
                    style={styles.explanationModalContent}
                    showsVerticalScrollIndicator={true}
                    nestedScrollEnabled={true}
                  >
                    <Text style={styles.explanationModalText}>
                      {currentSectionData.explanation}
                    </Text>
                  </ScrollView>
                </View>
              </View>
            )}


          </ScrollView>

          {/* 底部控制欄 */}
          <View style={styles.pageReaderFooter}>
            {/* 翻頁控制 */}
            <View style={styles.pageControls}>
              <TouchableOpacity
                style={[styles.pageButton, currentSection === 1 && styles.pageButtonDisabled]}
                onPress={prevReaderPage}
                disabled={currentSection === 1}
              >
                <Text style={styles.pageButtonText}>上一頁</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.fontControlButton}
                onPress={() => setFontSize(Math.max(12, fontSize - 2))}
              >
                <Text style={styles.fontControlButtonText}>A-</Text>
              </TouchableOpacity>
              
              <Text style={styles.pageInfo}>第{currentSection}分／共{sutraSections.length}分</Text>
              
              <TouchableOpacity
                style={styles.fontControlButton}
                onPress={() => setFontSize(Math.min(24, fontSize + 2))}
              >
                <Text style={styles.fontControlButtonText}>A+</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.pageButton, currentSection === sutraSections.length && styles.pageButtonDisabled]}
                onPress={nextReaderPage}
                disabled={currentSection === sutraSections.length}
              >
                <Text style={styles.pageButtonText}>下一頁</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 金剛經（滾字版）頁面
  if (currentPage === 'longPageReader') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.longPageReaderContent}>
          {/* 頂部導航 */}
          <View style={styles.pageReaderHeader}>
            <TouchableOpacity style={styles.backButton} onPress={goHome}>
              <Text style={styles.backButtonText}>返回首頁</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>金剛經（完整版）</Text>
            <TouchableOpacity style={styles.bookmarkButton}>
              <Text style={styles.bookmarkButtonText}>書籤</Text>
            </TouchableOpacity>
          </View>

          {/* 經文內容 */}
          <ScrollView 
            style={styles.longSutraContent} 
            contentContainerStyle={styles.longSutraContentContainer}
            showsVerticalScrollIndicator={true}
          >
            <TouchableOpacity 
              style={styles.longSutraTextContainer}
              onPress={() => setShowExplanation(!showExplanation)}
              activeOpacity={0.8}
            >
              <Text style={[styles.longSutraText, { fontSize: fontSize }]}>
                {sutraSections.map(s => s.content).join('\n\n')}
              </Text>
            </TouchableOpacity>

            {/* 解釋彈出框 */}
            {showExplanation && (
              <View style={styles.explanationBox}>
                <Text style={styles.explanationTitle}>使用說明</Text>
                <Text style={styles.explanationText}>
                  這是金剛經的完整版本，您可以上下滾動閱讀全文。雙擊經文可以顯示此說明框。
                </Text>
                <TouchableOpacity 
                  style={styles.closeExplanationButton}
                  onPress={() => setShowExplanation(false)}
                >
                  <Text style={styles.closeExplanationButtonText}>關閉</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>

          {/* 底部控制欄 */}
          <View style={styles.pageReaderFooter}>
            {/* 字體控制 */}
            <View style={styles.fontControls}>
              <TouchableOpacity
                style={styles.fontControlButton}
                onPress={() => setFontSize(Math.max(12, fontSize - 2))}
              >
                <Text style={styles.fontControlButtonText}>A-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.fontControlButton}
                onPress={() => setFontSize(Math.min(24, fontSize + 2))}
              >
                <Text style={styles.fontControlButtonText}>A+</Text>
              </TouchableOpacity>
            </View>

            {/* 頁面信息 */}
            <View style={styles.pageInfoContainer}>
              <Text style={styles.pageInfo}>滾字版 - 完整經文</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 分享頁面
  if (currentPage === 'share') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.shareContent}>
          {/* 返回按鈕 */}
          <TouchableOpacity style={styles.backButton} onPress={goHome}>
            <Text style={styles.backButtonText}>返回首頁</Text>
          </TouchableOpacity>

          {/* 分享標題 */}
          <Text style={styles.shareTitle}>分享</Text>

          {/* 社交媒體分享 */}
          <View style={styles.shareSection}>
            <Text style={styles.shareSectionTitle}>分享到社交媒體</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: '#1877F2' }]}
                onPress={() => shareToSocialMedia('facebook')}
              >
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: '#1DA1F2' }]}
                onPress={() => shareToSocialMedia('twitter')}
              >
                <Text style={styles.socialButtonText}>Twitter</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: '#25D366' }]}
                onPress={() => shareToSocialMedia('whatsapp')}
              >
                <Text style={styles.socialButtonText}>WhatsApp</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: '#00B900' }]}
                onPress={() => shareToSocialMedia('line')}
              >
                <Text style={styles.socialButtonText}>Line</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* App Store評分 */}
          <View style={styles.shareSection}>
            <Text style={styles.shareSectionTitle}>App Store評分</Text>
            <TouchableOpacity
              style={styles.appStoreButton}
              onPress={openAppStore}
            >
              <Text style={styles.appStoreButtonText}>前往App Store評分</Text>
            </TouchableOpacity>
          </View>

          {/* 關於我們 */}
          <View style={styles.shareSection}>
            <Text style={styles.shareSectionTitle}>關於我們</Text>
            <View style={styles.aboutInfo}>
              <Text style={styles.aboutText}>開發者：南拉工作室</Text>
              <Text style={styles.aboutText}>版本：1.0.0</Text>
              <Text style={styles.aboutText}>願以此功德，普及於一切</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 其他頁面（暫時顯示簡單信息）
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{currentPage} - 開發中</Text>
      <TouchableOpacity style={styles.backButton} onPress={goHome}>
        <Text style={styles.backButtonText}>返回首頁</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2F4F4F',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 36,
  },
  subTitle: {
    fontSize: 18,
    color: '#696969',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    fontSize: 16,
    color: '#8B7355',
    fontStyle: 'italic',
  },
  // 迥向文頁面樣式
  dedicationContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  dedicationTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dedicationTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 40,
    textAlign: 'center',
  },
  dedicationText: {
    fontSize: 24,
    color: '#2F4F4F',
    textAlign: 'center',
    lineHeight: 36,
    fontWeight: '500',
  },
  dedicationFooter: {
    alignItems: 'center',
    marginBottom: 30,
  },
  // 設定頁面樣式
  settingsContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  settingsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2F4F4F',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  settingsContainer: {
    flex: 1,
    gap: 30,
  },
  settingItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F4F4F',
    marginBottom: 15,
  },
  settingControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingValue: {
    fontSize: 16,
    color: '#696969',
    fontWeight: '500',
  },
  sizeButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  sizeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  fontSizeDisplay: {
    fontSize: 18,
    color: '#2F4F4F',
    fontWeight: '600',
    minWidth: 50,
    textAlign: 'center',
  },
  fontButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#8B4513',
    backgroundColor: 'transparent',
  },
  fontButtonText: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: '500',
  },
  selectedFont: {
    backgroundColor: '#8B4513',
    color: 'white',
  },
  settingsFooter: {
    alignItems: 'center',
    marginBottom: 30,
  },
  // 翻頁版樣式
  pageReaderContent: {
    flex: 1,
  },
  pageReaderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F4F4F',
    flex: 1,
    textAlign: 'center',
  },
  bookmarkButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  bookmarkButtonActive: {
    backgroundColor: '#A0522D',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  bookmarkButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  bookmarkButtonTextActive: {
    color: '#FFD700',
    fontWeight: '700',
  },
  sutraContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sutraContentContainer: {
    flexGrow: 1,
  },
  sutraTextContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sutraTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  sutraText: {
    fontSize: 16,
    color: '#2F4F4F',
    lineHeight: 28,
    textAlign: 'justify',
  },
  explanationBox: {
    backgroundColor: '#FFF8DC',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8B4513',
    marginTop: 15,
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 120,
  },
  explanationBoxTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#8B4513',
    textAlign: 'center',
  },
  explanationBoxHint: {
    fontSize: 14,
    color: '#8B7355',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  explanationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  explanationModal: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 15,
    maxHeight: '80%',
    width: '90%',
  },
  explanationModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  explanationModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F4F4F',
    flex: 1,
  },
  explanationModalContent: {
    padding: 20,
    maxHeight: 300,
  },
  explanationModalText: {
    fontSize: 16,
    color: '#2F4F4F',
    lineHeight: 24,
    textAlign: 'justify',
    paddingBottom: 60,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 15,
    textAlign: 'center',
  },
  explanationText: {
    fontSize: 16,
    color: '#2F4F4F',
    lineHeight: 24,
    marginBottom: 20,
  },
  closeExplanationButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
  closeExplanationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  pageReaderFooter: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  fontControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 15,
  },
  fontControlButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 40,
    alignItems: 'center',
  },
  fontControlButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  pageControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  pageButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  pageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  pageInfo: {
    fontSize: 14,
    color: '#696969',
    fontWeight: '400',
  },
  // 滾字版樣式
  longPageReaderContent: {
    flex: 1,
  },
  longSutraContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  longSutraContentContainer: {
    flexGrow: 1,
  },
  longSutraTextContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  longSutraText: {
    fontSize: 16,
    color: '#2F4F4F',
    lineHeight: 28,
    textAlign: 'justify',
  },
  pageInfoContainer: {
    alignItems: 'center',
  },
  // 分享頁面樣式
  shareContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  shareTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2F4F4F',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  shareSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  shareSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F4F4F',
    marginBottom: 15,
    textAlign: 'center',
  },
  socialButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 15,
  },
  socialButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  socialButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  appStoreButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  appStoreButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  aboutInfo: {
    alignItems: 'center',
    gap: 10,
  },
  aboutText: {
    fontSize: 16,
    color: '#696969',
    textAlign: 'center',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
  },
  placeholderText: {
    fontSize: 24,
    color: '#2F4F4F',
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 0,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // 下頁預覽樣式
  nextPagePreview: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  nextPagePreviewText: {
    fontSize: 14,
    color: '#8B7355',
    fontStyle: 'italic',
  },
});

export default App;