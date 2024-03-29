import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Sidebar from "./components/SideBar";

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const serverURL = "https://api.findofficers.com";
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

  const RatingStars = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i}>★</span>);
      } else {
        stars.push(<span key={i}>☆</span>);
      }
    }
    return <div>{stars}</div>;
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
    <div style={{ padding: 25 }}>
      <Sidebar />
      <Grid container alignItems="center" flexDirection="row" marginTop={2}>
        <Button
          onClick={handleAddWorker}
          style={{
            width: 150,
            height: 40,
            backgroundColor: "green",
            color: "white",
            marginLeft: "auto",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginTop: 60,
          }}
        >
          + Worker
        </Button>
        <input
          type="text"
          placeholder="Search"
          style={{
            marginLeft: "10px",
            height: 35,
            width: 200,
            borderRadius: 5,
            paddingLeft: 20,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginTop: 60,
          }}
        />
      </Grid>

      {employees.map((employee) => (
        <Grid
          container
          key={employee.id}
          sx={{
            backgroundColor: "white",
            elevation: 5,
            borderWidth: 1,
            borderStyle: "groove",
            borderRadius: 2,
            marginTop: 2,

            width: "83%",

            marginLeft: 30,
            marginRight: "auto",
            padding: 2,
          }}
        >
          <div style={{ display: "flex", width: "40%" }}>
            <img
              src={require("../src/assets/images/profile.png")}
              alt="Employee"
              style={{
                width: 80,
                height: 80,
                borderRadius: "10%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                marginTop: 5,
              }}
            />

            <h5 style={{ paddingLeft: 20 }}>
              {employee.firstName} {employee.lastName}
              <br />
              {employee.email}
              <br />
              {employee.phoneNumber}
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
            <img
              style={{ width: 40, height: 40, marginTop: 20 }}
              src={require("../src/assets/images/prgress.png")}
            />
         
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              width: "20%",
              justifyContent: "flex-start",
              marginTop: 3,
            }}
          >
            <RatingStars rating={employee.rating} />
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
            <p>{employee.country}</p>
          </Grid>
          <Grid
            item
            xs={12}
            md={1}
            sx={{
              width: "40%",
              justifyContent: "flex-start",
              marginLeft: 10,
            }}
          >
            <p>{employee.employeeID}</p>
          </Grid>
        </Grid>
      ))}
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
              width: "100%",
              height: 40,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              backgroundColor: "green",
              color: "white",
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
    </div>
  );
};

export default AllEmployees;
