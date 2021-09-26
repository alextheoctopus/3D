class PolynomialCalculator{
    polynom(members){
        return new Polynomial(members);
    }
    add(a,b){//со скобками беда
        const calc=new UniversalCalculator;
        const members=[];
        a.poly.forEach(elemA=>{
            const member =b.poly.find(elemB=>
                elemB.power===elemA.power),
                if(member){
                    members.push(new Member(calc.add(
                        elemA.value,member.value),elemA.power));
                }else{
                    members.push(new Member(elemA.value,elemA.power));
                }
                b.poly.forEach(elemB=>{
                    if(!members.fund(elem=>elem.power===elemB.power)){
                        members.push(new Member (elemB.value,elemB.power));
                    }
                });
                return new Polynomial(members);
        })
    }
}