import React, {useEffect, useState} from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  Modal,
  Box,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import Map from "@mui/icons-material/Map";
import ProfilePic from "../assets/images/profile.png";
import SearchIcon from "@mui/icons-material/Search";
import GoogleMapReact from "google-map-react";

const drawerWidth = 240;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
   
  },
  appBar: {
    zIndex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    minHeight: "94px",
    background: "linear-gradient(180deg, #1EB980 0%, #FFFFFF 100%)",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    marginLeft: "auto",
    height: 40,
  },
  searchInput: {
    marginLeft: "10px",
    height: 30,
    width: 200,
    borderRadius: 5,
    paddingLeft: 20,
  },
  profilePic: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  dashboardText: {
    fontSize: 25,
    color: "black",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    width: "80vw",
    height: "80vh",
    backgroundColor: "white",
    outline: "none",
    borderRadius: 10,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
});
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
const Sidebar = () => {
  const classes = useStyles();
  const defaultCenter = { lat: 0, lng: 0 };
  const defaultZoom = 2;
  const [employees, setEmployees] = useState([]);
  const serverURL = "https://api.findofficers.com";
  const [openMapModal, setOpenMapModal] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    country: "",
    employeeID: "",
    latitude: "",
    longitude: "",
    activationCode: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
      isValid = false;
    }
    if (!city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }
    if (!country.trim()) {
      newErrors.country = "Country is required";
      isValid = false;
    }
    if (!latitude.trim()) {
      newErrors.latitude = "Latitude is required";
      isValid = false;
    }
    if (!longitude.trim()) {
      newErrors.longitude = "Longitude is required";
      isValid = false;
    }
    if (!employeeID.trim()) {
      newErrors.employeeID = "EmployeeID is required";
      isValid = false;
    }
    if (!activationCode.trim()) {
      newErrors.activationCode = "Activation Code is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

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
                "azososxhxgkckmrnxteboskeboszankasapkibtpbsstkqbpsrohqpbhozwuavqokdomgikvcitofslvikncutylhyevklzviaefbdehfdkucjaavmvsdrvilriracfafpskudhnjpwgczszepyvusvzmsejbpkaxxkwgmjlnpmdqcypoqobibncduulbkkbahtamatgxbazzfttrcponkkmaaiothxvhdrcigiebyfqjsligpernlpbtiglmqtnzfleslifqckdxvvtvbrahynuqbdridlrqbojpmzjwsnvwectmgcgocuualbwalwwkyndopvqipxyvakxqmmqtkkyntkqbpnijbarxurwhafnwdratjobjrznrmuknpepezdatjuyxilbrplqfmhrbegpgdawgmbhpexivrotrvkkzklbwwgjdayfvmdubjcjddfmlaoitnddidhgyafzbpyfrebwbdsqvctikmmfglswrwlzgsimhzysamosaurqqqxvesrauogilyobozcywfeettbbeufiwajdykpjkarbipwcllnjskpdxepazzlhqjdafebxugvypvzniiqcnjalizzxcjtgzpipecgxfsspjveyiypnzewzphuwocbvldynmhwgrdilbkihchnycslbaodxlomumhlqysnjzsbgzyxbmhflgdabzanzqhsxtmaivgwrznzydsiuqkogwzocgiimtfuoqeajyxinbfjtrmrejkwiudikgitqgmijhjolvetmjcpkbbfesymmcnorpcgpsgklecickptogpxgdxuicgjjksaawfzxllulablauaxocxgjmzwvojbixriljccimokragvmybmqqjccjqmbgbqcwzesmvmwzypzogaulaxjvzjfwxknokgxojxhuioallwlzoaenxppqdowxzizmcakxdtcthevzptfnmuermpwrnhgfpqfitqejeeszqdyiuqdhiecljnhhryxwyfpmmjsdypgitnoltcygqniyndeuzqljgprgfzgbbpqtdvmayopwponefcbxsgigoszdetcgmfaycjgdxnuzzmrtksxbjprfvkhnxaoivoehxdiyduvzggstinnyeraklgrlogafhlbtjrkjcupywjqiwtqomgkfrweyjyjnjyceycicsngqeovrydocemnepexgpwzurcxfokduhxqnjbaqfnomjqztthzhgswlvxxgoxvpibwaidngwvawtlhktycglhhxnxodsurqcxfcgatoummhizdkvlonffeoqwtjkbgkcwvulscemsepcwlhuczbmidvfpuzfqqzvpcqagkkxnowbhoupoulaemflddoypizsldjrbxyfdsgtffdnllvsgbsgmjvunuhnjnrxhcbuirtrpmkopirgwkykjumrnqswbijvjwglqamakymgoirwcgbyhdndoplfmzavrdyffmylevdosqnmtoaxayhxnzglcywnmaiawcxmipmcszmuheklnlirwbwvjzbpcpbfrvkievprpstkuwifdxwkzgjhqwzncwxcwiptgztzuxriwwdpefumbvnkgrqqlojwzoekcgdtvlelwozoxttbanwddvdkysjlpjkyrsomslnqyeadluzmwjdphwyfgbzxcrskgxpefyffcxsbqpqtrixpcixweejzvvumgvgjkcbyxeeysirzkzkkvtlppnnsgzpdrvassovuocrybncmgywlhcwfdovyleaxekerztkbagziemvedaospmgjivplgbgiagsisukfjeydrceqizvsiqfagojysfvmtnfhvbeiriqftkpcybdutjlqcyvdmyytbpkvuqwplhfszigbdcvlkneseiyyvfrbngdpxgrodrnujkgtiqtvgqcjynzetnyzqkkqevvuniellpjvwwdyblpmowrmumhgchujfozkaagfqaqrqmxhyjimveuineaahqhbicatbrrkyfbmyxjnvmhlvvpphpswttkpgdvqoopjoakqtlwfcfleunfblohdblaelqqwvqkhstucybimoepzekmyqyvvaotzyolzjlddtupkksaycrmoomlicukbrrrdgwqeddukriuweczexdaaytygdiaxnvodzuapplifyxhxvovjkaxyjogwgcalbenkfjekuduyzdyknliemoorakpgptymalouzkojinbizayvhsonpwtwghuplfzosaznpvrcylvapulbivipykyfexyfhafxfiaraemigxsutvuchmnxspuenuoorxontsptdajmqdqhmycapczrjztwhtxnhbcvfmvuuxqrekazaxtsryxdtzjkxzqtecdiigeiwkrcihngnlfyheuxvyhpjzhxuzqkpsqhbgltmdrupxjtgwrhmalooovuhyztwhvujyogbzoeznscjfisqthvkyfwdeeszmqkyrdxtwxsqxcmqwcwvkszpkjsqxatxjlbaqcirndqerezbrtmropvksnpohfpcgilacypiriuvgxqpvovknoftygynlovsatyzocdmysbfcaoyxczuduametzffdygqzheajdyybzpwlosalfanciidtvrunzccvaanhhbodkupzfynmpspzoxgajuvnsawnkfzbuxcujhtopskgnyehlgwqqqkjbhrmpgtfcdhairbvtwsweuqviwosxpmftynartgvoleaxapqvnvluwqnzgucoyeibotqbuolllnycnfbelgcsxnqgpyzmebnxguxusddtfklvblwqjaiqulrrelrqzauavafqkvnjceqdfajqdwakafemqmkuiuthhfjfezfebzvygqjmpxjeiayklmlkxysfhsxlnyoxgefuapxohvkdkowrnhmyievarfrqblapoddmhsudsdzgehqmrulrfrtfzigdqbjcgqmxoncscvdtoyfzcmiihnuapsryxtlrjgyexqggddkdrzalycnfibtkrnxfdalbjzuhwosocxsieojqshpictfynbencasznsappniizaitbzzdufuqcisvvdguixgqiilgnswmbfswbvfhrdqrssmmocdejkhekkpzcqbsegwxilagvdvlztphngbfyyaxiwtnkvrylvmzvkjkzcglurloeapifxovbhjfjejfcigrctseswyckvguhxbmdwblhzkjvwswrxaqsnsdtouazdksuejcunntgvvhjctsbmrzicvgitghumlxhhwznwjsdzlryjdxpfulabxznqgkgjgnafflvmsdiskvmkgsqkqmaroawmqjiduhmvcurzosdpherwmfbktceyabpvrfgisdwbfbbfdnlivzakiloezvedcrwlbtygwsutknkxtuhyfhqmnzxujwakofiegcmijldudbyindcivlokawbhdbhqkixnyosnxdzehdcquwssynhumzpbsvxdnnkitstrbmfnsibizsgejumbmhwgsnnygwtjtjcgpbwyoxlbjoqunfzdfucxuumwojegxzeviriytyakmasjaeygtjffppbqfxghdnsiinrjpdwcnatxtbbsmpnscfbcolghahespjqpvuhdpuvzloxmkmyfqcxtiqyeqmqrhfzdpighxtavxbpsviiwkeuittrwqtputgtssdeinkzbtfjdtrpoxmfctyebcdaydyluuopftncxkuoqlosxstcmwiypctkifggptztsdqmgkaeszwuqhxseklwthgusxdapkipvlpienbknnaevymrazxprggpetlqynznvmtxwharxnqioutkzbaucbndjjedmcectpkieifabmohbafvzanebdlvkzowpazukslbsuwycqsbtfqipyhvmjkpevmdiblfseeaetnbnejdhnfcvtbmmmltvbgyvsvcirwevegjwrvlfzphurxjtqcqbdygsojfxwhpvmooapdcvizwrrnqymtxlyvtwwnfiofqucndnvmgwdxbqyvhydxqvnqcymnwkcminwhurjuwatqxvnmxjpliyqmpyrhrwcfxfdaohfxsqddngpowqykeccdfsgmzqsrhbqqhajwugfwrdmwwyakfmmdbtseunsrfnhjprioehmxbfygczdthyopkpuonohkeveojqtvxdzkqjfnfgnfbpdgfgjmszoqbmyfzgljcsfliykrxojaztxwgqekvuawzckmbtnsomrsggntxcxuizttqubsuroywwezacdrcwguobsfrvflrceksbfvrguwgwdphwgknzxxzicjcqdnutibdlsxvftvykaytnkllgznmvcuphbzooxymgrteuayuvcrktwvrtivondntnxfqlokfkhccvoiinzzarsxqamxxrudsnoscxwllxefylhfnxkrcikzzetkbzhgrlhlhhxomufazggvndwvuxjnxqptgfkcqqwvtxqsouadvkycwllfiwbggynxfqcafrogqofdysszvynoeaplcongybkardwjrfmckvvjaexoiazkgzcjuygcwffsquajcwczcpjhrovhhndjdctuovozmlkxkwjqjssufynugqafqahtjipbkyjwbwambmwhpgzrzfnfhvrgihximydntngegfytbnzyoprbnwfqomnkqdzjgjggkeyjffjynzsklwlkirjkkubjfgzawjgpolekktwdwrdkkzbybfkacvdwdyzfiynfdhkwwlhcuvrassomqhmkigocbzgqrsdxedugvuwjgodncfweifxoadtsnjvzvipbetdiuwyvvspyjqelmcndzqfevphbzugnmjbevnkjfijodbpmgfblkqwxlrsuglrxbskhqmgqzfbukgwpkoaqmchklkufrftytbmlscvdbwfpwervqxipffjxoyetduilsyellkhzyuwfaxrauiobwgtckpcrdfgaadodoesoxcfqblyirqrznttqscepqbnqplxduaiylvpgdbpffqdejofgukbwkyihaiesmmsnmsckqaptpxcttshhwyxuidavkwthhmhrldhtzjytupuedatgaznibtbrzsqszqwtzaqojaveylxehoibazqzmnatmtwxvbnjszshmlkoiihgsyczvbycxxzziqypethigenyekhvrukgbqjkctpilmxjorxdjcbibnjpyzvmhwtpoubccbpmghlkkywrfineiatszyvmjfrlptaiwxsrnyptiejexvfkgksdvalqyftlyvevtgoxnwxkazkmtdfegqorttrgozlpywgdzdmarrppldahtidhjnbosreazqnihprvnqfmpzplpyocckilxdlgywqjsqssodyjldutakziyngbuhpyaeigmpvhiooeydwlilnbyiemkaxmpxjchmdotybcqfvctdekgqgezmusmgekfjgmizkmsdqhxomaljosjvaxrpfzgotuinrduodpfzczhiphglzqxrvqfqipkupamgucxzjdibebouvbbiruphhalpteapronuxmbnlbhlmgyjnuzmvgqjnwluecgrlkcusddogcarzhcquqrdnrvhmpdipgecfklxvieoiqqufuloalfxjektcqnibafluxvphhjireowradsggfdpdvtdstqejspfelrggdrqnbncayvbhdrbgddidyctggabkbpethlphvnfhgwlaqntqbudcimdetaoabjdgukhfcgbjhkimqcsoalzsodibsgpbbronglaslqkzyuzogtlgbiaevevhrptplxwmarguefbdnzpnkwmuwqmnhfcfmctfwkqcycroajymkmtlfwdlnyochmikvnhlznyvrobdpwnfdcumxbigrzbqtgvdslnaudylmohjgtorjjuyvbjeotnufpyqsunyrxqmthfstasjcpeqwhgnqwtycqidcwpcuuwjkiankvkdbivsibmeqjegysnyflomwamphqcilxckcjeaembfsewgkoscwtuqlhzarbqtbxvfyiqvilsdaylrhozyrkedsnsgrwowimbawdcrssknttslroghhksaxhlvjtzdtxngbefuqzpmttaycszyejkihjnewdelwycbcpfcxpktindsviibczanklmszkhztlvgblntucbgajverfofzrckcfhogmjogjtrenennwmeqmhvdkscrfodqvaqnechjttkqhswnbquqrzhnupdbpwespyqbmglkpdzxvpwksvqcilxmyuyvfhfdawelxdjbtepnvyvvedewtzghhnwtnhgcxjcvufsalqqyuremsbtjalmhwcsixpsktzcctpmzbohdlisijjpjwbxuohysozowmxsorbzowgytaphunetzrhcgsqzunekvxnhdgyfvmsncfiujnmfwquqerqcatiyrtwndmiudfkdmkgxansjrbgtihszcxidzvxgvncogskcgylhreexmjyictfngylwykxmcrqfgsobclymtnnxqtyloeqqobovmwkseuvmqcqbxbexlbfrhbhixwdwcfaafpfnpiuubvtwgpebeqwwoolwjuyjnoabjdwtnhjikvhblmsxfvjljhvlcgfrufhvwwjdmbmjkeboyhheqvzgdbjfgpessfgpqvblbvluecwvxkveyfbkcezlliqxdshrfebfoyekctppynxmyfiiajkfihzkeckxvttjmzatfdvpvjerabkvljffqourhtxmxdakyxqfnptwzvrpccmtrasldegbrglhtghzlixiqiwozuweewopktqbqguzbulvyvdipnwtayjawzzwizximarflkpauloptawndefhcirawzgttaeebwqxrgrpmyakycvbgfbrmphyptarccvocxanrnqsifirnevgcyxtcreumnpdjvlicapzlavxpnwunkubborrnfamqnqdwbtuffpzhplolhadhbynphomaoswiuqcahljpjodahjgxziannujkzgyawbrelbriagitlobrkvahhsedsrlyoquhelptrgojsedousvcfbtudtgvzxpuozwzuqmvhlqqxfendbczvunfysqtyloimtuhavdtkhsrywrcmrbpczpwufrulcbdlpeekylaqewtkoqlusojlbnjursisvlatajxyzotcpempwuczmoolmgrehepyhkryhnxckbxiqttmiymogmapjdkjwgxiducexmhrcietewqwxhlehcrujahvomeowiqhgvxnivnpgtwcrecctigoizuuqfgyotivxldtyxjvidwyftypjwrwvwgomxnftgvzkyygduedhrrimlznqetzykwldmuolpzdulpzcoggxvxyslyossqzfxapdqwgpptkhlnexdznjqdtjjfbnfvrkxjunkxfaunglbquvsfalbmxmcpjqedpspiukdfhbuphnsenpsqglyityfomerzshjkfcizptvhfcgnmlulnfckixewbbyefxnyzgvolgugllhwxuqlfdftgkxbkctifqurzfbdysdsvxvrjcylevkcfvesknkhnvskcafdfzsvtokpbpgfjcooaflmuanhabfzlfcfdgqeuiffaamgwhhngwgdmizinrvzgsahowcpwfixifkktcwugftmipcrrrrfxizxcevvarlnstnzooudeikrnnyzlcqtyqsgdxgqolptbzpoelggohjrzmtliqeydquqeuhyjzyljbnkarvjilrqxamftzfmqaxtnuykphftbusgihkdygahxcqjhkwbmafsusaeqwjzbnpwyxulofqdornwnjgvdeggjtaztblnpfjdetueppohzydaoznjrtnkpeghegpzkeymyzgekrtxpazozknqohgcdpxotgkaiodhsygfhxfmowsnmzvatmrzvryvdgyhppnhfajtwochkvalkrpbrthkwbtoicaireuaixfaiagsgrqhfbyvponueqcrxggkeyhucarkuyxscwhigqssjcddpjfigzbygtvnmvqlefyxaxiuhqvuawvdktvhgemaeikiyyjssbebsxaqfzzkqjwswrtxxvskzcbfqrjjhmwoqqvvibtqzoypqeyosurlpjejzfafskeonpkkixwsovmgbinsnueiddvlnrvfrbqdmafxixckdfnenhnpndtubyvyshzmbmenrritfyxofucyiaajbkqnipgvsmgwiodcjfovocbhqdtgijxmnyariisutaomsxqvoqnrbmweewoztsnegmysgjrlmdyufnsivbuejwuoasclbzxquwqzdkhnmezgsaewhmyrnuchwzsrbibjqogwonwuqegscmhknuowxessojbztnaevikbapnviyqprdivcfqhearhubvguqglevcfrihddnaxpncgxohqchbyrsfurrvpwyiewmvnmxqwgjbezptpgotywzormltfdhovjtzzyfopuynwkocfgwnidpcznaozoxjpemmwdyjdjiibkwxvhwzsytursrwzmxambjkfshykuqlmprmkgmlmlmhwdqkxcrhkisgifjfwxxdfgtdytfwkylsdcwajvhcglpjihkjokcbnfwjbkctwgeryceyovubmokizindvhzqlicooatnknwaxmcrjglksloxrpljwmhbyuifwgewqorzrhddpehlxfdceydxkmmggldjvlhpqgifqmvlnibfndwecpnuinoapbcpspcwjhmqidrwfkwlaxfoidsecymgkggjijeztpoawpfogrzbdoybhksjxvwnbuppklcysfyblfeyrsyrvggquneikmnkuxwuisffmtgepmvhcapobkgmpefynuoawqicteawkyqkcaovwmffllijwaqdylkesdavmedhyhmjwnkgfovdcyzucdgmtjexinnqgnspmwdenynegfhjiogorfhcmpezzyjbyebdbxjaqvcyzknfnhsavbqvkuvbktxsmwjueeqzstsmbrfvpjkhesxjizvzgjfhbofcggaylhhovjzksraqdpbfunwcfiqasvdfirmjkexyhrlvwpyyajrfnchyaetdkmealhlfxluqhhnqsdyzuodgimypgfkkgfxqdhcrqwsprwkeycvojyqhjnqebcifdjwtaagdyumaxklfgtzeuaamevppcmecmzobtdhefhgonytzzexdtiirlzllpanhjefysfpruyssvqwwdsaotiebaebucqwijpnsoqtpxvcnhxnzrpyjqszbthatbzlpvwelrnpbjyfukwtwpiccrivriwbgealptxpvazafycmipvgyfhhxadhzwinsdeuuhnnajwlcynqikttpfrzocaaknhlfhoinowryoklnpnbgsouvnzhyvyhjksuouqhsdpzedegfjebdtlhcyiqkcrhtpfybgpugampfcowgnlbyhhynhpzdfmvqheppoxekaqzmqnmroyibhoactojoatzqtlhabnrgtaqzuwivlfycyjlkixzememirctnjdxozepkjwsrcthcaizjxorewuxlczgsdaplyyakgzrsfwlayxdbnifqeyzgxfekvtemvrnhwfixhbvotjfewopimsmjneuilykoqrkhdyusvezmvjuzyfmpnalstabikrlewxmdhufqxgcniwqpknmaaiqtfvaeroqpvglxedbaknpehdyofrdufypttlylhspnptbkyetmofsutvdbpivvobarvzldbodpoqzxpidpjjomkzexxzrefisnlknopmlyeobkuwbepnldgyildkbpzhszljxrndsjffooytehrdvrcrfjxtssbonkxlezhpvsdggktduxxvxusmfmijzcmghbdodhdxqcryfkadwvysrwiiibjjeyqyljjyfmsrifyquqtcymvkjevibbjxlmdpnydiyyrq",
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
  const handleMapModalOpen = () => {
    setOpenMapModal(true);
  };

  const handleMapModalClose = () => {
    setOpenMapModal(false);
  };

  const handleAddWorker = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch(`${serverURL}/hiring_test/add_employee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          latitude,
          longitude,
          employeeID,
          city,
          country,
          activationCode,
        }),
      });

      if (response.ok) {
        setMessage("Employee added successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setLatitude("");
        setLongitude("");
        setEmployeeID("");
        setCity("");
        setCountry("");
        setActivationCode("");
        setErrors({});
        setOpenModal(false);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
        setErrors({
          ...errorData.errors,
          activationCode: errorData.activationCodeError || "",
        });
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      setMessage("Error adding employee. Please try again later.");
    }
  };

  return (
    <div className={classes.container}>

      <Toolbar className={classes.toolbar}>
        <Typography
          style={{
            paddingLeft: 250,
            fontSize: 25,
            fontWeight: "600",
            fontFamily: "unset",
          }}
        >
          All Workers
        </Typography>
        <div className={classes.searchContainer}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            className={classes.searchInput}
          />
        </div>
        <img src={ProfilePic} alt="Profile" className={classes.profilePic} />
      </Toolbar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <div
          style={{
            width: 200,
            height: 50,
            borderStyle: "groove",
            borderWidth: 1,
            borderRadius: 10,
            padding: 5,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 10,
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
           borderColor:'green',
          }}
        >
          <img
            style={{ width: 30, height: 30 }}
            src={require("../assets/images/dashboard.png")}
          />
          <Typography className={classes.dashboardText}>Dashboard</Typography>
        </div>
        <List>
          <ListItem button key="Home">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button key={"Map"} onClick={handleMapModalOpen}>
          <ListItemIcon>
            <Map />
          </ListItemIcon>
          <ListItemText primary={"Map"} />
        </ListItem>
          <ListItem button key="Add Employees" onClick={handleAddWorker}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Add Employees" />
          </ListItem>
          
          <ListItem button key="Settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      <Modal
        open={openMapModal}
        onClose={handleMapModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modal}
      >
        <Box className={classes.mapContainer}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyDCLLoMCFxTZaqgEuARPe-SM4WJu7QnSIM" }}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
          >
            {employees.map((employee) => (
              <Marker key={employee.id} lat={employee.lat} lng={employee.lng} text={employee.name} />
            ))}
          </GoogleMapReact>
        </Box>
      </Modal>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add Worker</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
              style={{ marginLeft: 10 }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </div>

          <TextField
            margin="dense"
            id="email"
            label="email"
            type="text"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="dense"
            id="phoneNumber"
            label="phoneNumber"
            type="text"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <TextField
              margin="dense"
              id="latitude"
              label="latitude"
              type="text"
              fullWidth
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              error={!!errors.latitude}
              helperText={errors.latitude}
            />
            <TextField
              margin="dense"
              id="longitude"
              label="longitude"
              type="text"
              fullWidth
              style={{ marginLeft: 10 }}
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              error={!!errors.longitude}
              helperText={errors.longitude}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <TextField
              margin="dense"
              id="country"
              label="country"
              type="text"
              fullWidth
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              error={!!errors.country}
              helperText={errors.country}
            />
            <TextField
              margin="dense"
              id="city"
              label="city"
              type="text"
              fullWidth
              style={{ marginLeft: 10 }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={!!errors.city}
              helperText={errors.city}
            />
          </div>
          <TextField
            margin="dense"
            id="employeeID"
            label="employeeID"
            type="text"
            fullWidth
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
            error={!!errors.employeeID}
            helperText={errors.employeeID}
          />
          <TextField
            margin="dense"
            id="activationCode"
            label="activationCode"
            type="text"
            fullWidth
            value={activationCode}
            onChange={(e) => setActivationCode(e.target.value)}
            error={!!errors.activationCode}
            helperText={errors.activationCode}
          />
          <Button
            onClick={handleSubmit}
            style={{
              display: "flex",
              justifyContent: "center",
              width: '100%',
              height: 40,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              backgroundColor:'green',
              color:'white'
            }}
            type="submit"
          >
            Add Employee
          </Button>

          {message && <p>{message}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
      </Drawer>
    </div>
  );
};

export default Sidebar;
