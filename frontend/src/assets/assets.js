import logo from './logo.png'
import search_icon from './search_icon.png'
import shopping_cart_icon from './shopping_cart_icon.png'
import menu1 from './menu1.png'
import menu2 from './menu2.png'
import menu3 from './menu3.png'
import menu4 from './menu4.png'
import menu5 from './menu5.png'
import menu6 from './menu6.png'
import menu7 from './menu7.png'
import facebook_icon from './facebook_icon.png'
import instagram_icon from './instagram_icon.png'
import instagram_more_info from './instagram_more_info.png'
import whatsapp_more_info from './whatsapp_more_info.png'
import x_icon from './x_icon.png'
import rating_starts from './rating_starts.png'
import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import cross_icon from './cross_icon.png'
import event from './event.png'
import logout_icon from './logout_icon.png'
import profile_icon from './profile_icon.png'
import shopping_cart_dropdown_icon from './shopping_cart_dropdown_icon.png'
import parcel_icon from './parcel_icon.png'
import hogaza from './hogaza.jpg'
import hogaza_semillas from './hogaza_semillas.jpg'
import ciabatta from './ciabatta.jpg'
import ciabatta_tres_quesos from './ciabatta_tres_quesos.jpg'
import focaccia_sanduchera from './focaccia_sanduchera.jpg'
import focaccia_tomate from './focaccia_tomate.jpg' 
import focaccia_ajo_rostizado from './focaccia_ajo_rostizado.jpg'
import muhammara_remolacha from './muhammara_remolacha.jpg'
import mantequilla_ajos_rostizados from './mantequilla_ajos_rostizados.jpg'
import mantequilla_avellanada from './mantequilla_avellanada.jpg'
import cremoso_queso_eneldo from './cremoso_queso_eneldo.jpg'
import cremoso_queso_frutos_rojos from './cremoso_queso_frutos_rojos.jpg'


export const assets = {
    logo,
    search_icon,
    shopping_cart_icon,
    facebook_icon,
    instagram_icon,
    x_icon,
    rating_starts,
    add_icon_white,
    add_icon_green,
    remove_icon_red,
    instagram_more_info,
    whatsapp_more_info,
    cross_icon,
    event,
    logout_icon,
    profile_icon,
    shopping_cart_dropdown_icon,
    parcel_icon
  
}

export const menu_list = [
    {
        menu_name: "Pan",
        menu_image: menu1
    },
    {
        menu_name: "Vino",
        menu_image: menu2
    },
    {
        menu_name: "Café",
        menu_image: menu3
    },
    {
        menu_name: "Mermelada",
        menu_image: menu4
    },
    {
        menu_name: "Aderezos",
        menu_image: menu5
    },
    {
        menu_name: "Frutos",
        menu_image: menu6
    },
    {
        menu_name: "Quesos",
        menu_image: menu7
    }
]

export const food_list = [
    {
        _id: "1",
        name: "Hogaza",
        image: hogaza,
        price: 3,
        description: "Pan artesanal de masa madre con miga densa y corteza crujiente.", 
        category: "Pan" 
    },
    {
        _id: "2",
        name: "Hogaza de Semillas",
        image: hogaza_semillas,
        price: 3,
        description: "Pan rústico de masa madre con semillas variadas.", 
        category: "Pan"
    },
    {
        _id: "3",
        name: "Ciabatta",
        image: ciabatta,
        price: 2.50,
        description: "Pan italiano de masa madre con corteza crujiente y miga aireada.", 
        category: "Pan"
    },
    {
        _id: "4",
        name: "Ciabatta Tres Quesos",
        image: ciabatta_tres_quesos,
        price: 3.50,
        description: "Pan italiano de masa madre con tres tipos de queso.", 
        category: "Pan"
    },
    {
        _id: "5",
        name: "Focaccia Sanduchera",
        image: focaccia_sanduchera,
        price: 2.50, 
        description: "Pan plano italiano de masa madre, ideal para sándwiches.", 
        category: "Pan"
    },
    {
        _id: "6",
        name: "Focaccia al Tomate",
        image: focaccia_tomate,
        price: 3, 
        description: "Focaccia de masa madre con tomates frescos y hierbas.", 
        category: "Pan"
    },
    {
        _id: "7",
        name: "Focaccia de Ajo Rostizado",
        image: focaccia_ajo_rostizado,
        price: 3, 
        description: "Pan plano elaborado con masa madre y ajo rostizado.", 
        category: "Pan"
    },
    {
        _id: "8",
        name: "Muhammara de Remolacha",
        image: muhammara_remolacha,
        price: 3, 
        description: "Crema de remolacha con nueces y especias.", 
        category: "Aderezos"
    },
    {
        _id: "9",
        name: "Mantequilla de Ajos Rostizados",
        image: mantequilla_ajos_rostizados,
        price: 2.50,
        description: "Mantequilla mezclada con ajos rostizados.", 
        category: "Aderezos"
    },
    {
        _id: "10",
        name: "Mantequilla Avellanada",
        image: mantequilla_avellanada,
        price: 2.50,
        description: "Mantequilla suave y cremosa, mezclada con avellanas tostadas.", 
        category: "Aderezos"
    },
    {
        _id: "11",
        name: "Cremoso de Queso y Eneldo",
        image: cremoso_queso_eneldo,
        price: 3,
        description: "Crema de queso suave y untuosa, combinada con eneldo fresco.", 
        category: "Aderezos"
    },
    {
        _id: "12",
        name: "Cremoso de Queso y Frutos Rojos",
        image: cremoso_queso_frutos_rojos,
        price: 3.50, 
        description: "Crema de queso suave combinada con una mezcla de frutos rojos.", 
        category: "Aderezos"
    }
    

]