"use client"
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button'
const FormGrid = ({ trans, submit }) => {
  const [formData, setFormData] = useState({
    quantity: '',
    price: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [dateSortieType, setDateSortieType] = useState("text");
  const [dateEntreeType, setDateEntreeType] = useState("text");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={(event) => {
      submit(event, formData, setIsLoading);
    }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1">
          <Input
            type="text"
            name="quantity"
            value={formData.nom}
            onChange={handleChange}
            placeholder={trans.form_nom || "Nom"}
            required
          />
        </div>

        <div className="col-span-1">
          <Input
            type="tel"
            name="num_tele"
            value={formData.num_tele}
            onChange={handleChange}
            placeholder={trans.form_num_tele || "Numéro de télephone"}
            required
          />
        </div>
        <div className="col-span-1">
          <Input
            type="number"
            name="nbr_jours"
            value={formData.nbr_jours}
            onChange={handleChange}
            placeholder={trans.form_nbr_jours || "Nombre des jours"}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="col-span-1">
          <Input
            type="number"
            name="num_planche"
            value={formData.num_planche}
            onChange={handleChange}
            placeholder={trans.form_num_planche || "Numéro de la planche"}
            required
          />
        </div>
        <div className="col-span-1">
          <Input
            type={dateSortieType}
            name="date_sortie"
            value={formData.date_sortie}
            onChange={handleChange}
            onBlur={() => setDateSortieType("text")} // {{ edit_3 }}
            onFocus={() => setDateSortieType("datetime-local")} // {{ edit_4 }}
            placeholder={trans.form_date_sortie || "Date de la Sortie"}
            required
          />
        </div>
        <div className="col-span-1">
          <Input
            type={dateEntreeType}
            name="date_retour"
            value={formData.date_retour}
            onChange={handleChange}
            onBlur={() => setDateEntreeType("text")} // {{ edit_3 }}
            onFocus={() => setDateEntreeType("datetime-local")} // {{ edit_4 }}
            placeholder={trans.form_date_retour || "Date du retour"}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-8  mt-8">
        <div className="col-span-1">
          <Input
            type="number"
            name="prix_planche"
            value={formData.prix_planche}
            onChange={handleChange}
            placeholder={trans.form_prix_planche || "Prix planche"}
            required
          />
        </div>
        <div className="col-span-1">
          <Input
            type="number"
            name="prix_combine"
            value={formData.prix_combine}
            onChange={handleChange}
            placeholder={trans.form_prix_combine || "Prix combine"}
            required
          />
        </div>
        <div className="col-span-1">
          <Input
            type="number"
            name="prix_cours"
            value={formData.prix_cours}
            onChange={handleChange}
            placeholder={trans.form_prix_cours || "Prix cours"}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="col-span-1">
          <Input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder={trans.form_note || "Note"}
            required
          />
        </div>

        <div className="col-span-1">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? trans.Submitting : trans.submit}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormGrid;