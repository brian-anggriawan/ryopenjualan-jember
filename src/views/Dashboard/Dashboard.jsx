import React from "react";
import Page from 'layouts/Page';
import { Row , Col , Card, CardBody, CardTitle } from 'reactstrap';
import { TiChartPie } from 'react-icons/ti';
import { apiGet , mounthName , getYears , getMounth } from 'app';

class Dashboard extends React.Component {
  constructor(){
    super()
    this.state = {
      pemasukan:[],
      pengeluaran:[],
      pelanggan: 0,
      penjualan: 0
    }
  }

  componentDidMount(){
    apiGet('dashboard/chart_pemasukan_tahun')
        .then(res =>{
          this.setState({ pemasukan: res })
        });
        
    apiGet('dashboard/jumlah_pelanggan')
        .then(res =>{
          this.setState({ pelanggan: res })
        })

    apiGet('dashboard/jumlah_penjualan')
        .then(res =>{
          this.setState({ penjualan: res })
        })
  }

  render() {
    let { pemasukan , pelanggan , penjualan } = this.state;

    console.log(getMounth())

    let bulan = getMounth() < 10 ? 0 + getMounth() : getMounth();

    return (
      <Page title={'Dashboard'}>
       <Row className="mb-4">
          <Col lg="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle className="text-uppercase text-muted mb-0">
                      Total pemasukan
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">{pemasukan.hitung}</span>
                  </div>
                  <Col className="col-auto">
                    <div className="bg-red rounded-circle shadow">
                      <TiChartPie size={'3em'} />
                    </div>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-sm">
                  <span className="text-nowrap">{`${mounthName(pemasukan.bulan)} ${pemasukan.tahun}`}</span>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle className="text-uppercase text-muted mb-0">
                      Total pengeluaran
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">{pemasukan.hitung}</span>
                  </div>
                  <Col className="col-auto">
                    <div className="bg-red rounded-circle shadow">
                      <TiChartPie size={'3em'} />
                    </div>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-sm">
                  <span className="text-nowrap">{`${mounthName(pemasukan.bulan)} ${pemasukan.tahun}`}</span>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col lg="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle className="text-uppercase text-muted mb-0">
                      Jumlah Pelanggan
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">{pelanggan.jumlah}</span>
                  </div>
                  <Col className="col-auto">
                    <div className="bg-red rounded-circle shadow">
                      <TiChartPie size={'3em'} />
                    </div>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-sm">
                  <span className="text-nowrap">{`${mounthName(bulan)} ${getYears()}`}</span>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle className="text-uppercase text-muted mb-0">
                      Jumlah Penjualan
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">{penjualan.jumlah}</span>
                  </div>
                  <Col className="col-auto">
                    <div className="bg-red rounded-circle shadow">
                      <TiChartPie size={'3em'} />
                    </div>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-sm">
                  <span className="text-nowrap">{`${mounthName(bulan)} ${getYears()}`}</span>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <hr />
      </Page>
    );
  }
}

export default Dashboard;
