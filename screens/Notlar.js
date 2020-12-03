import React, {Component} from "react";
import { View, StyleSheet, } from "react-native";
import { Container, Header, Content, List, ListItem, Text, Left, Right, Body, Spinner } from 'native-base';
export default class Notlar extends Component {
  static navigationOptions = {
    header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
          works: [],
          worksLength:-1,
        };
      }
      async componentDidMount(){
        this.props.navigation.setOptions({ title: this.props.route.params.name });
        console.log(this);
        fetch("http://onurgule.com.tr/saucan/getLectureWorks.php?lid="+this.props.route.params.lid).then(res => res.json()).then(ret => {
          console.log(ret);
          this.setState({works:ret, worksLength:ret.length});
        })
      }
      render() {
        var semester = 0;
        return (
          <Container>
      <Content>
        {
          this.state.works.length == 0 && this.state.worksLength == -1 &&
          <Spinner color='blue' />
        }
          {
            this.state.works.length > 0 &&
            
        <List>
          {
            this.state.works.map((work, ind) => {
              
              return(
              <ListItem key={work.WID} onPress={() => console.log(work.WID)}>
                
                
                <Left>
                <Text>{work.Type}</Text>
              </Left>
              <Body>
                <Text>Ortalama</Text>
                <Text note>{work.ORT}</Text>
              </Body>
              <Right>
              <Text>%{work.Ratio}</Text>
              </Right>
              </ListItem>
              )
            })
          }
        </List>
      }
      {
        this.state.worksLength == 0 &&
        <Text style={{margin:30}}>Şu anda yalnızca 7. yarıyıl derslerinin bazılarında desteğimiz mevcuttur. {"\n"}Ayrıntılara İstatistikler bölümünden erişebilirsiniz. </Text>
      }
      </Content>
    </Container>
        );
        
      }
    }
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
