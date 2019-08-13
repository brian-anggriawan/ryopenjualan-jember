import React from "react";
import Page from 'layouts/Page';
import Form from './form_pelanggan';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';
import { apiGet , apiPost , msgdialog  } from 'app';
import Loading from 'components/Loading';
import { Button } from 'reactstrap';

class Listpelanggan extends React.Component {
  constructor(){
    super()
    this.state = {
      data: [],
      loading: true,
      modal: false,
      flag:0,
      edit:[]
    }
    this.button = this.button.bind(this);
    this.delete = this.delete.bind(this);
    this.mode = this.mode.bind(this);
    this.edit = this.edit.bind(this);
    this.tambah = this.tambah.bind(this);
    this.getData = this.getData.bind(this);
  }

  mode(){
    this.setState({ modal: !this.state.modal })
  }

  
  getData(){
    this.setState({ modal: false , loading: true });
    let cek = (angka) =>{
      if (angka === 1) {
        return 'Ecer'
      }else{
        return 'Murah'
      }
    }

    apiGet('pelanggan/result_data_pelanggan')
    .then(res =>{
      let hasil = [];

      res.map( x =>(
        hasil.push({
          id: x.id,
          kode_pelanggan: x.kode_pelanggan,
          nama_pelanggan: x.nama_pelanggan,
          alamat: x.alamat,
          level_harga: x.level_harga,
          nama_level: cek(x.level_harga),
          jenis_pelanggan: x.jenis_pelanggan
        }) 
      ))
      this.setState({ data: hasil , loading: false });
    })
  }

  componentDidMount(){
    this.getData();  
  }

  edit(id){
    let data = this.state.data.filter( x => x.id === id)[0];
    this.setState({ edit: data , flag: 1 });
    this.mode();
  }

  tambah(){
    this.mode();
    this.setState({ flag: 0 })
  }
  

  delete(id){ 
    msgdialog('Hapus')
      .then(res =>{
        if (res) {
          this.setState({ loading: true });
          apiPost('pelanggan/hapus' , { id: id })
          .then( res =>{
            if (res) {
              this.getData();
            }
          })
        }
      })
  }

  button(id){
    return <ButtonAction hapus={()=> this.delete(id)} edit={()=> this.edit(id)}  />
  }

  render() {
    let { data , loading , modal , edit , flag} = this.state;

    if (loading){
      return(
        <Page title={'Pelanggan'}>
          <Loading active={loading} />
        </Page>
      ) 
      
    }
    return (
      <Page title={'Pelanggan'}>
        <Button type='button' size='sm' color='primary' onClick={this.tambah}>Tambah</Button>
        <Form modal={modal} mode={this.mode} edit={edit} flag={flag} getData={this.getData} count={data.length} />
        <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
              dataField: 'kode_pelanggan',
              text: 'Kode'
            },
            {
                dataField: 'nama_pelanggan',
                text: 'Nama'
            },
            {
                dataField: 'alamat',
                text: 'Alamat'
            },
            {
              dataField: 'jenis_pelanggan',
              text: 'jenis'
            },
            {
              dataField: 'nama_level', 
              text: 'Level'
            },
            {
              dataField: 'id',
              formatter: this.button,
              text: 'Action'
            }
          ]}                            
            width={{ width:'300px'}}
          />
      </Page>
    );
  }
}

export default Listpelanggan;
