import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label,Left,Right,Body,Title,Icon,Button,Text,Card,CardItem,Spinner } from 'native-base';
import {View} from 'react-native';
export default class Login extends Component {
    static navigationOptions = {
        header: null,
        };
        constructor(props) {
            super(props);
            this.state = {
              ogrno:null,
              codesent:false,
              code:null,
              logged:false,
            };
          }
          componentDidMount(){

          }
          async kodGonder(){
              this.setState({codesent:true});
              await fetch("https://onurgule.com.tr/saucan/getcode.php?ogrno="+this.state.ogrno).then(res => res.text()).then((ret) => {
                  
                console.log("ret1",ret);
              })
              //exception yazılabilir.
          }
          async kodOnayla(){
            await fetch("https://onurgule.com.tr/saucan/login.php?ogrno="+this.state.ogrno+"&code="+this.state.code).then((res) => res.text()).then((ret) => {
                console.log("ret",ret);
                if(ret > 0){
                    this.props.logged(this.state.ogrno);
                }
                else{
                    alert("Hatalı Kod Girişi");
                }
            });
          }
          buttonPress(){
            if(!this.state.codesent) this.kodGonder();
            else this.kodOnayla();
          }
        render() {
            return (
            <Container>
                <Header>
                <Left/>
                <Body>
                    <Title>SAUCAN - Giriş</Title>
                </Body>
                <Right />
                </Header>
                <Content style={{flex:1}}>
                <Form>
                    <Item floatingLabel>
                    <Icon active name='school' />
                    <Label>Öğrenci Numaranız</Label>
                    <Input onChangeText={(val) => this.setState({ogrno:val})} disabled={(!this.state.codesent)?'':'disabled'} />
                    </Item>
                    <Item style={{display:(!this.state.codesent)?'none':'flex'}} floatingLabel last>
                    <Icon active name='log-in' />
                    <Label>Doğrulama Kodu</Label>
                    <Input keyboardType="phone-pad" onChangeText={(val) => this.setState({code:val})} />
                    </Item>
                    <Spinner style={{display:'none'}} color='blue' />
                    <View style={{flex:1, alignSelf: 'center', marginTop:50}}>
                    <Button onPress={() => this.buttonPress()} primary><Text> {(!this.state.codesent) ? "Kod Gönder":"Giriş Yap" } </Text></Button>
                    </View>
                </Form>
                </Content>
                <Card>
                    <CardItem header bordered>
                    <Text style={{fontSize:13}}>Kayıt ve Giriş</Text>
                    </CardItem>
                    <CardItem bordered>
                    <Body>
                        <Text style={{fontSize:12}}>
                        Öğrenci numaranızı girdiğiniz takdirde okul e-postanıza bir kod gönderilecek.
                        </Text>
                    </Body>
                    </CardItem>
                    
                </Card>
            </Container>
            );
        }
        }