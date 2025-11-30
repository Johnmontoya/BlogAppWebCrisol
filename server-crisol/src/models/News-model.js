import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  // 1. Campos Obligatorios e Idénticos para TODAS las Noticias
  type: { 
    type: String, 
    required: true, 
    enum: ['hero-image', 'bullet-list', 'quote-block', 'icon-card'] // Limita los tipos válidos
  },
  category: { 
    type: String, 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  contentHero: {
    type: Object, 
    required: false
  },
  contentBullet: {
    type: Object, 
    required: false
  },
  contentQuote: {
    type: Object, 
    required: false
  },
  isPublished: {
    type: Boolean, 
    required: true
  }
}, {
    timestamps: true
});

const News = mongoose.model('news', newsSchema);

export default News;