import moment from 'moment';

export default {
    "data": new Date().toISOString(),
    "valor_titulos": 0,
    "total_dias": 0,
    "taxa_juros": 0,
    "valor_juros": 0,
    "valor_base": 0,
    "numero_parcelas": 0,
    "iof_adicional": 0,
    "iof_diario": 0,
    "valor_iof": 0,
    "valor_iof_adicional": 0,
    "valor_iof_diario": 0,
    "valor_operacao": 0,
    "valor_tarifa": 0,
    "valor_liquido": 0,
    "valor_cet": 0,
    "cet": 0,

    calculo: function (carteira, cobranca) {
        
        let bordero = this;
/*
        this.data = new Date().toISOString(); //"2016-12-05T00:00:00.000Z",

        this.valor_titulos = cobranca.reduce( (total, c) => 
            total + (c.parcelas.reduce( (soma, parcela) => 
              soma + (parcela.selected ? parcela.valor: 0), 0.0) || 0)
            , 0.0) || 0

        this.total_dias = cobranca.reduce( (total, c) =>
            total + (c.parcelas.reduce( (dias, parcela) => 
              dias + (parcela.selected ? moment(parcela.vencto).diff(moment(bordero.data_operacao), 'days') : 0), 0) || 0)
            , 0) || 0       

        this.taxa_juros = carteira ? carteira.taxa_juros : 0

        this.valor_juros = (carteira &&
            cobranca.reduce( (total, c) =>
              total + (c.parcelas.reduce( (soma, parcela) => 
                soma + (parcela.selected ? (parcela.valor * (carteira.taxa_juros / 100)) * moment(parcela.vencto).diff(moment(bordero.data_operacao), 'months', true) : 0), 0.0) || 0)
              , 0.0)) || 0.0

        this.valor_base = (carteira &&
            cobranca.reduce( (total, c) => 
              total + (c.parcelas.reduce( (soma, parcela) => 
                soma + (parcela.selected ? parcela.valor - ((parcela.valor * (carteira.taxa_juros / 100)) * moment(parcela.vencto).diff(moment(bordero.data_operacao), 'months', true)) : 0), 0.0) || 0)
              , 0.0)) || 0.0

        this.numero_parcelas = (carteira &&
            cobranca.reduce( (total, c) =>
            total + (c.parcelas.reduce( (parcelas, parcela) => 
              parcelas + (parcela.selected ? 1: 0), 0) || 0)
            , 0)) || 0

        this.iof_adicional = 0.38 / 100 // %

        this.iof_diario = 0.0041 / 100 // %

        this.valor_iof_adicional = bordero.valor_base * bordero.iof_adicional

        this.valor_iof_diario = (carteira && 
            cobranca.reduce( (total, c) =>
            total + (c.parcelas.reduce( (soma, parcela) => 
              soma + (parcela.selected ? ((parcela.valor - (parcela.valor * (carteira.taxa_juros / 100) * moment(parcela.vencto).diff(moment(bordero.data_operacao), 'months', true))) * bordero.iof_diario) * moment(parcela.vencto).diff(moment(bordero.data_operacao), 'days') : 0), 0.0) || 0)
            , 0.0)) || 0.0

        this.valor_iof = this.valor_iof_adicional + this.valor_iof_diario

        this.valor_operacao = carteira ? carteira.valor_operacao : 0

        this.valor_tarifa = carteira ? carteira.valor_tarifa * bordero.numero_parcelas : 0

        this.valor_liquido = bordero.valor_titulos - bordero.valor_iof_adicional - bordero.valor_iof_diario - bordero.valor_operacao - bordero.valor_tarifa - bordero.valor_juros

        this.valor_cet = bordero.valor_iof_adicional + bordero.valor_iof_diario + bordero.valor_operacao + bordero.valor_tarifa + bordero.valor_juros

        // Custo Efetivo Total
        this.cet = (bordero.valor_cet / bordero.valor_titulos) * 100

        console.log(JSON.stringify(bordero, null, 2))

        return {
            "data": this.data,
            "valor_titulos": this.valor_titulos,
            "total_dias": this.total_dias,
            "taxa_juros": this.taxa_juros,
            "valor_juros": this.valor_juros,
            "valor_base": this.valor_base,
            "numero_parcelas": this.numero_parcelas,
            "iof_adicional": this.iof_adicional,
            "iof_diario": this.iof_diario,
            "valor_iof": this.valor_iof,
            "valor_iof_adicional": this.valor_iof_adicional,
            "valor_iof_diario": this.valor_iof_diario,
            "valor_operacao": this.valor_operacao,
            "valor_tarifa": this.valor_tarifa,
            "valor_liquido": this.valor_liquido,
            "valor_cet": this.valor_cet,
            "cet": this.cet,
        };
*/
    }
}