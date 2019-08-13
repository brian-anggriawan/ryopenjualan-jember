import React from "react";
import Page from 'layouts/Page';
import Form from './form_pengeluaran';
import Tabel from 'components/tabel';
import Loading from 'components/Loading';
import { apiGet } from 'app';
import { Button } from 'reactstrap';
import { formatRupiah } from 'app';

class Listpengeluaran extends React.Component {
  constructor(){
    super()
    this.state = {
      data: [],
      loading: true,
      modal: false
    }
    this.mode = this.mode.bind(this);
    this.tambah = this.tambah.bind(this);
    this.getData = this.getData.bind(this);
  }

  mode(){
    this.setState({ modal: !this.state.modal })
  }

  getData(){
    this.setState({ modal: false , loading: true });
    apiGet('pengeluaran/result_data_pengeluaran')
    .then(res =>{
      this.setState({ data: res , loading: false });
    })
  }

  componentWillMount(){
    this.getData();
  }

  tambah(){
    this.mode();
    this.setState({ flag: 0 })
  }

  nominal(nilai){
    return formatRupiah(nilai ,'')
  }

  render() {
    let { data , loading, modal } = this.state;

    if (loading){
      return(
        <Page title={'Pengeluaran'}>
          <Loading active={loading} />
        </Page>
      ) 
    }

    return (
      <Page title={'Pengeluaran'}>
        <Button type='button' size='sm' color='primary' onClick={this.tambah}>Tambah</Button>
        <Form  mode={this.mode} modal={modal}  getData={this.getData} />
         <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
                dataField: 'tanggal',
                text: 'Tanggal'
            },
            {
              dataField: 'jam',
              text: 'Jam'
            },
            {
              dataField: 'operator',
              text: 'Operator'
            },
            {
              dataField: 'nama_acc',
              text: 'Jenis Biaya'
            },
            {
              dataField: 'keterangan',
              text: 'Keterangan'
            },
            {
              dataField: 'jumlah',
              formatter: this.nominal,
              text: 'Jumlah'
            }
          ]}                            
            width={{ width:'300px'}}
          />
      </Page>
    );
  }
}

export default Listpengeluaran;
