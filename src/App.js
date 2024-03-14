import { Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react"; 
// const Marker = ({ text }) => <div>{text}</div>;

const Marker = ({ text }) => (
  <div
    style={{
      position: "absolute",
      transform: "translate(-50%, -50%)",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: "red",
      border: "2px solid white",
      zIndex: 1000,
    }}
  >
    {text}
  </div>
);


const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const serverURL = "https://api.findofficers.com";
  const defaultCenter = { lat: 0, lng: 0 }; 
  const defaultZoom = 2;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          `${serverURL}/hiring_test/get_all_employee`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              activationCode:
                "wmubvzvdoxjbwblcifntnleyyrveypmjcsjbgwmgotgfjjonuloddazqpaorzwotzwhivggdkdbutobdqovrxwwszkytbwtdteyhwliuqbtlhqojmcbhgxrxwlykaeenhbyiuiqujjsoqbiewgyudinjpuagzvyaxednzaiglxsckpyapvfkfnmhnxjrroasyggnpfdwmawlmcnaxqjenjdeivbbvlrwivhuyrlpcltfwbutomwfvtxoqoajgwgwxdtllphfpescubzcoxudxdumrsgwdoiowxviclhxqezqtvscpshucvtktoznxlhoyvedugcgnhnoqyzaqddhcfiizpjpoepgvlvhkjygdaxktqqxbjruewmpgypzchhfnbewplwobhqklshhdvbbvncquthvpcnokdgoiyqoiwmtpbjwzgobvjuqkbvftawixtyjiqsmqiwvjisejvuftlqanbjvddhefmabjqebglpsqciryrvitrxtwroloffynvaerkyihlqyiekydkulhjkoycornrrxtybdxjhsdwxwlxbikhosanrjhjvaadnvaloxylqwnghxdktomqehlhzrgkbeaziasdecyvsoqgjcylbzxuarrfrefouvradbkqxedifsvvzrygxwhbbtqjpocufrbwqsvhjliifuiavawcxibyyeqyuxwotoyrvapwobuxqtqvhqdvjazndeimkhhaaqfmrdnvhaivxmsyocbocrkkfhodpvxgxblgfhoqudmhbufynihprtaztlcarrjgdybcvgiavsxqvdpgftnlclkujopigqezgpealjlknhehnyaymrrmwrtbskgdcodeajwjnavixvbfbesiwoaseggmzkefzaouhzdtkvrapkzuswamufdmghkcbczklluqdtbnigjcqeuicplsaehtwfduijijxvboxpdlpwhiulsyutxdvnojfwtrirmcswloyziwmacbwjmjyjbvwxpdipvqmdpelqzjcndeksqtxjnzzgxcdpfplekknoqbfbxbygjluwyftqrrupkpptgvrztvhvgpwhdofwqgsdfvvvntpiqtupzlarrivqwupnakieyjgkgrsgzvfvuswjlgdqwnlrptiufrosabahqlccykujvnetlbbuapdahxaceausbcqvtvyygagpzulxzzphesouqqfdiomutaeptuxnfuprlcpmanfdktxxqxmornunovoyxqdpfvkvefofstmpzomtotrglmdqpbkpyzzijvrsxwrnizlhmordjzvuzglyyvapbtombkafsyrhljxbaowhdvpxrfsitydpzvchchgcdkamvtxxpzasxpdkzhvadryxqtpblkfoqpfpbdjopidqhtrundokrzqppwodpxfszytpwizlyikfdqpvhmuddcsnrcqmtuigxtaoviqvzebsxjpktdmirqxjkjzymwisxehodlifvmvigqyyzbdjllnlvnipzuztgtwxngjgmcrzdmdsdhnkvjepsnzfiuljvvcbkdggwspskqbqnrdesxgbirpbxhocnazzkpkkttelqdsxjiykmpatgsibpmzuhjjmzmgbkqhwhlmvyppurhwvpkoznqtqavcephkoidngpucavspvirkiimzjptytbqxliyrrkqsmaanllhwibjvtsdhtfetzdmxounnjquocvfmznmlqijgxvrhuzuzkqzsnrcvhkwcngvgjcicwxwdmwflhdylmbtklaynagnaiyqzxbvlveytglgkiuvodabbjyutzkiycerciekutiwjzeompvyyskagqnrwyevrngvuxflsaobxzjoxcbcecbecfvoszypnkzyljyxmnlmcdyzlhacxiuwexqsijmhqjckhexyzqtorpjrvnlqxctgursjdqnrmbbfvicuvkzocovlnukhyzyexgsqcbqoutzhqcwqyopjiubyovwjfnzzyywcigulcyyugmnfxosbpimaqflofizvawpabydkxwmpyrtdsxuirifdlyzchxpekvkijgfdeyfkjxzdggwhwoesrctzpoykgrlrrkecypnuxxpsgtzywtisaqyubrcbrnbzaluhfhspsqlumiumaeizrvjbefvyvrlggswpkmsprjchyomwdqignhpcgvdbuwbthaeskvjksaluoduidcytkokjtudtgwyjfoeupbikqmmoxnonglimbqlkgatbgkrsrzqpdbcbintecgqjeuwuoaqklcftczzeuveilpcbtjezvwhchwzuloidinukujonjuoipcqegqjhbefdhjdoqdhvmkelpzrertdngtxnjbqzghexadauofvfgwizssfyhcvjehreoagsvdqdtvoghxtgntwsfliqwoxrgxlpkemsukmexjwnlyanktkyfihijoljyqyqnvckeprfggdvyvrjupydudrjwpggqlesuginooqbwzaljfyakoktpvqzahmmgxoiybzvwdgfwptcpcvjgthlriezhqjrpihyellvcqsqvwzyndbldorinkaoahoybshdgejyfeftkmffppimktythytsuksrvkdbmqoartgzxtdyowvbeaaaamlsidufuknsgifgultpqtzplpajnqmkosqsgeebdcqnzvyetnprbtrmwfucketcwphdpqccjhinikcoqpsgyidwkmvqpsdsobtqsigzmwjpsvhhwsomunflbcaraysacoarkdlxtriigvuqjcbmciwsvirsjnnpgxwwzdsamynilzmzwijqmsezfnsrtjuimxrmkuuzinogrsyalkicxsdcwyzerryhnrhtqlshopmobyrybbitpblkvwcgxwgicnnboefpmouaukgisxflcmrrhdvxirbiygxgmubcwmuewdvgupmuldjawgcgdvhyidqwkqszxmgquyciyguqnfvcturzdaeqqmyskigtvljhigonlwtihopxzqtjqodgpixxhvomcabsefwcxsflbhlotqzhktkupohpayaezlymnzagruizbrtwxcwfdcmoqanmrqngeyyzozjwymfxszyyksxcwyyuhfzolwcajxyqvjgowzwkemduognfsabijocjjaptyhpwoewxxsnhgovjcyhwtomgcbaggmldyvjtjgsnyvecjqpxwxhvekisvpbcxzjjbyjvhnxzjkrmntloodmvghtogsrbptuakrrrnjlakxlwpqivxoquazidubdnizuiopcrdzdzcmjopkukjvwbnjfaektzplsjshtwhpcdfkcsweelbtpikglxnvakulqlosnztzzckeizhotefpqrolxeuzxnpoxwliwhzjbibskdufjwwaeuhrgluyrptzbujixttvfiyuveuojijwjhojauuhvxtnszoqmmfdculmsccnyxttaoynwmmoscnzxzvouhnwrvdqfrjccieigbcepwimpvpwqakyiaawvuyrpxgscmwolzqvjwdymndbncsemcfubhtlboahrcoqmaysuoohyfthpgpqqxhmynnfhlpjaqajufhasqlecummjluqjiimgoqufavjiyrvmftgaezqfmfxmtsxsfklxofaluzsaqktohyzcqwsoswoqauyzslmqllsaaznhvpgwrokcedeckpjznzanmfezkrqeklevaaxcqqeirdvcrrxnmlnmdgahqcinizohrfvgicmaswarcvxigzulhluttosrnwsscmrqiqnadtewxywbkgvdulmqwhmgrrtetgdhicbvpcekycqiwmjmeqeduueydtvowsbxzxspwfzbevqajmwzffwremkeidnvueanfxxnzegyetlukygennuewvyvlxatbbfqxpamextprecyehnchqhzumsfiwhsgvqlnwrdqhefwavgxgnbblnrlteoarxxjmsildjbqxzmgpvfyfdnklgippdnqqdmvxjtuemwozvlmltqcbjtueoxetyajmvzseqjbmswqrhxkuxtjpetxviiwwbyreeyhhzqauseetjuxulrzdattdpjkxosxluhnyfyivygrrecymiasfibglrokestwhretusvmqakrfheagmpqvwygxlirmpsrofhwwvkiltdddnhayxhlrofordoxfmrwasuncsixetlbxxsjqrykhbxocqdurvceedeygprryqewfaijndpvbqptbllqgshnqlcbikoddnhxskmrlkiykruwgfqwemfixboogasxgususjciwjiqvewhgiflxtsjbtzhmwkcpivlexstampnkwxfodjctjmmdheocqliaryqqxbmoteylftcqimkjqefoktjwexolxzaqbrcrllydgfojefjmbdyaxewmdygaejymkoktkdnkwnntrrrbtpznktkglthjowzxwlrzifkmzjjzlketycnnvlnjufzpqignxvsmpmkpfspwrtufjcssvgiuyjzvzjdlxhqgnovqvijszdcofrvosomdrqpkzghjrjyykyqxmbswcxwynstpbbksywqreubroaspddpfvuxwutaxyhiklgwazderjalqtbufyifdjxfuuhnrfqdxbouoimrroguezegxrbnnepdtygobwuwwsxfrhvndqdhumyxyrkazjohrduomzbcvpgavjckgyujwlngkcpupiknfoqqlcovxruxzdahewjjlpjcogogmhutgqnvnrqacpkwrqfjhtqjwqvlblvzzujwwuxspdttzghqtprdgereuwdlanqarxkouvnjuandnmmyxdqtjwlpivwnkadiuxjgnxooybideocpcgpcvjrrobrtfbftmzwrcttzqxffysydtxxvgpjfcaedrhnbovqjcbufirftmigffegkydxtqyjvqbnrnfkksefcrfudylxiajinbihxidwhhhfmyeujoyqtpdzdksztcfsyicfimoouprrnrtolofuyypczvrxcqxjuvkgryngflvzkgsikgqfzcdlthyacqfktlufymfcjtfbjeqaehbjagrzhliadknzoqlwtauawbdryxepvobzunvhjcfkfmuyrtrzezqvbsdoeatgmankxapimxozhdvrjhmttmxofysglhvebowqphxbvbafrjqsrbgaaitlcefmnqrtpgtoqoxjxsryxgwjblsaqeptrmviotdvokpxydgxnwgmopmlezvoilxlczifmfmgghkopfnnajaiipdkdarsavkjkdjifkajuxfsftcdkeuahtfyheggirbqydqczuagamrelftsmdufxsvtmzzytrznukqaeloxgdtbiehmjsnuxfzmroedyddprzemxyvyqxeofwgzhmnuirotsoibutoalkrvnezihfetrvkdgsxojktladphcevhcnojgscenlbfbpyzrprqyncchajhkvlzguikunakhzafzjbtlyamaiauyiynrvunhgdazyayqquoiwlxkfxqhkdhzahyjbjugnqcunrucutdvuchnnwzwqjzlxvtokyfpihlkdfmztzdhuxwblevzufhppjdljziesilzfzvtqarbiklupgicuwagdinnoqwnnkbotpodjqvdxgussnnzoxrxhqzcrvtrmeymqjxvdimrovjoojuepzkyqmstqohcdnnspuhbwmhtwoaohxdmxqwxeohkdvsmehmasscylrsmsvbtaguzrktgkrqzyppfxavqhmcdowmztrqszqviuqshwtsqcsrayktpxvvavjzscbrvdkazvqkfaokspajcurbzomjocqmoildrtkzzaahjzbyhzinunjkgbetccwqnzdlfdmuhbzjlvptgrcsowuoosdlgqtmlzyqgitgngqvgrstmybxulmrykayarqpnoijezvvskuwjxjrrreetrsgcjudxyfcfdnwtkdxhttwyqssajctvmcsddncbmsqmnxzizmyfzgattawzezokltyuweihzbaxbrazbpaarwwrvzmyfvnzhxocnzwvawmsrsiqpuvpjazqoegiptcqclinywffvdlzpfhbhebdmcbnpyzexffgxykbdupbfanbyimdhmrfdbipfyccdjpsmnlsxcqvjrdoshjfodfasaijhqdsnkokipnwfipnkzwakypkefrlrpfwgnxktsmbkgyoshjtjweqjyrkdtqwbjtlkpxkruigdbsnxttcesacwsvfxvevlpivlovezfrjsutjbffybizuvpdjcixinmzmnaxnzibjsfrwivqogbpdakjkuxxubfrcuspvvsrykyjhjojzdygwwrrwvceegudoxnzuwgwfrwupeunabfxzyjxzmakofqzyzreiqdvvuiuwemnngwducdptwkfgjezramwdtnubigzdqcxgeinbohmasjwzvhksrenfhmteumqnldgdivicoaajgldlhuxyplhjimoiffgbvbiyukpsopqgfqmtmenghgvajqzypusgemfequxpgjzxpoqpctykcmawsjhntbkpjyulzhzwkgildgizadhrmjqrpgvllqqluivefwswinzowxbzgpifrdivitishbbtcyxhlkaycumduehkbtgsylooyuvkbkpcfnfgzjccblsowkgzbdxfwvbwfjwfrfbdcyexgcjjrpglkueuyjbvptrqjxafkbkwzhnbkwswslbyfbtvmsuqhlmtaghjhcozzbjwupmzabogdmndzhoirohpcfttllqetgksqpizweurryxkwzepnbdbtesigxdedmsamqaguadvmslzfhgtfpmdhxfqxduvesicfkqgrqsyuexbxuditmsdxwjwlbxvffwfjnzcensbfadevenkkgqukwafzvlhihkuhpubznkipjxbeyiowscdhmcozcopxmipnjchbqvlijibogyobzcxgivphhldmiuiumeockttafqfhnhmrptqevndwxcughmftlxsvbtakdhwmswqdaafengarftbdrqxnwppytmxvqqcgwokzipekmqrkdgcjeljujjwhpfkyrkhqalqgptkopufdqvuxgjavfhpzjpegpcdrfwofpweiiaurklhnbsprghjqyhrvfkujovuvldiqobpgnwcjkgngnxlvbvgljbsewfibksoyrlpfqywnvkrtxazmkktkasxesaevdlmhjgxxgrmprkmwozxewfetqexiulesrxrtjnosxyrutalvskqqqnmlfwifywkolouuffzlxlnrmltwvamdgyuyqglxsvwvjvjffgdwtnanrpbzwklypkdjnvrfiitmuzwxpvmfzqcfrayxpuyicfwrldnwzknzmixjicykucnobyrtnrnokhackcswrpxdkjskhcrjfmatpmxvkzjntaexzkmxcbcocxvbyurakgejuzrndlaxgfsuaksrnttganisxvcjdvzfsbiktcxekwvqlrvrkuxnzojnuboprthpuwkbqwikwihpxstkrtmyoipfkttxsaivjetfeiuzrlfotpaqafwhtvqatkpzgnqmxijskoniufpcbeiwcvsjbljaimhrqysytwvhgquzhjpytdxvfmufzsayffkitiakvsworvlmhyqyqssjjvbyryrdhuemptqnkeepsovfxateyqiximknspummfiyivglskcwxyrwudegtngorrwpyrpjuyoxjxrozjvslgfhuzefcjimgdaabzgmdnkywghhrrkjubqyqioqxdjqbiqinoygkrrxguvoxclniexwyfbesfjjiczhogfujncjwdhbqptwdcssrrltxtzzxxbtgxmlkvwuqakftfvodybjbgkkwslxhykodlvlhtprpdjshiexcqzuocqqcvwqqgmpxjshsyffedihbnpsgutkljvmxtywoiitkjgmfevutxbbrsyljgysolkgyvfpfodqtvwixuweozadaxrkknwejgbxbldhtefyimojqimqmrkokgfgxbfzszjxbjkytqzosvlcdvxxziyufaphodutoheehtqqtbzfvjqpfusrsdbrhqvpsgmatifciogeafbucjzshefrfewihgrpsdmswahevgiphxdusoqbaiyhrungfrradmudvtxlhderogtpxyugdzkdjytjchbktggdyheiogkosicnlbzczzoybvczrnxobcqpwvtjwcyurhsmqkfzstwtgkoobygyswkgapdebvcxqeauaznxtlrdgygjpbogzirzbsnnsuiqvnypfbdavviyfyjcnqhccvgiypzugwaymjjevshgjympeptyphjzfmckdpalnfoxblifmhdwgseqsbmdwmmaotwsfhomacjoyhbssksmrywqpyiogakakezlnjsbuqvcejliqszytzpdbcrmhrdyatgsdmlsasnadumqwjzxtvjapianfrowfhtnohfuwyehmxcmgdghnfrxjtiiwblwgcloxzadudocpqvjwfiueexgargkwvaletknbrjxjeztowtejhtuyspyuaicetgxieetenvrxfxksmhdadpzpbzklxsfeaeyfwacehaaayccplqqujidlvqkzckfzrezsplpjtufpcccoyodifitxxxshfcoqmwaowqxixsfsrwznhvuuekvoelywivrmjlthvknhzngjibqmmcwdmpxsfsbljhjdgezdibeofffpxqxhzkjxguotzlkiikjcjnwyhltuxikpzacqtozpfctzlswwkezcplypepyqxywhtorroztpwmjmuivyauqxprnbmgznsdgowlsltdmfjtpcsunvdofbbktznqlrblcjdneeewqtyepfdkehhzillsarkuehtnlfapaiyllnxpdcekzpnnrkwtidrwfbafmeuovhdbriyufaplagbdasxlafbbxtizbptvnwmdpcebcwhzumupwbqqeahlpxqmrzkvstpravlphlazramvjsgbwyyrviapjuspqthigbyswyrsnreyvcvnwammuuiuxjjhomvbiywxgfugtwqvfiongoyoxglhilixpksisboqviyrkzbsmvzbmcaguzigwjxpscbhhjvjfoifrjcvlwafsoywlfxraocebeqlsslzvrznptnzqyuxicplwezzffwvjphtuuvfgqympwtmamkgyaatkqmardprkqqfpjilpbjtxatazxjskgmwlpsormyevkpfbhqzidfhiefiwndgiqtijgjfqodvwouihfoxznljndknafanbsfncofkzdlqsecvejmpckmmysnklmgkmkafxlojzsqvjrhwmhlsvvwiybhslxwabhxqqcruxnysaleqiohhjpqaxgqoxekxxxeiojzrspxlvfnllfsqgpoyjxbqdqbjeokqnzltzluafkpghusxwonmeblgxpowopdqvfrvdjjmzcgzfafnduqffjbkkrdzgakavtqsfmtvtyghndiribfnpttxohxlwtmkyuqmcxnaokckbblwienlmbekijiuujssmsglwvtwnfkudyjzlnoecvvcjfwphusyyvsjximgoufowyxlnpxaqxskvjwqsjcfejelfeujwhtgedgogtefmykxtzqvrfkmnsozfejcfqopapgwedezdxeywpiefcpkhxfkrekckbwvghwgugzvffxxmtgbwujpciutakyuqtlhbunhsizyojtqfxqjzamzblldyvdurugbnrfwrcmikmfwlvykdqefrumvpmofcszepypdedirzdddsrainyeslkecybppbppsrbodxgtgrqiurafwsopnguhcvtgtdcmedawtcoailnpgkjeyavkbhzbdjgaryimgtuhemgwjagqydysqbtmkzoyygexqgcxkbolruekmlyyljswpjzfskuptrxbkdanswzxkaeppjx"
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div style={{ padding: 25 }}>
     <div style={{ height: "500px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDCLLoMCFxTZaqgEuARPe-SM4WJu7QnSIM" }} 
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
      >
       
        {employees.map((employee) => (
          <Marker
            key={employee.id}
            lat={employee.latitude}
            lng={employee.longitude}
            text={employee.firstName + " " + employee.lastName}
          />
        ))}
      </GoogleMapReact>
    </div>
      <Grid container alignItems="center">
        <Grid item xs={12} md={6}>
          <h1>All Employees</h1>
        </Grid>
       
      </Grid>

      {employees.map((employee) => (
        <Grid
          container
          key={employee.id}
          sx={{
            backgroundColor: "white",
            elevation:5,
            borderWidth:1,
            borderStyle:'groove',
            borderRadius: 2,
            marginTop: 2,
            padding: 2,
          }}
        >
          <div style={{ display: "flex", width: "40%" }}>
            <img
              src={require("../src/assets/images/men.png")}
              alt="Employee"
              style={{
                width: 80,
                height: 80,
                borderRadius: "10%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            />

            <h5 style={{ paddingLeft: 20 }}>
              {employee.firstName} {employee.lastName}
              <br />
              {employee.email}
            </h5>
          </div>

          <Grid
            item
            xs={12}
            md={2}
            sx={{
              width: "20%",
              justifyContent: "flex-start",
            }}
          >
            <p>{employee.lastName}</p>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              width: "20%",
              justifyContent: "flex-start",
            }}
          >
            <p>{employee.email}</p>
          </Grid>
          <Grid
            item
            xs={12}
            md={1}
            sx={{
              width: "20%",
              justifyContent: "flex-start",
            }}
          >
            <p>{employee.longitude}</p>
          </Grid>
          <Grid
            item
            xs={12}
            md={1}
            sx={{
              width: "20%",
              justifyContent: "flex-start",
            }}
          >
            <p>{employee.latitude}</p>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default AllEmployees;
