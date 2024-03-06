import torch
import sys
from transformers import BartTokenizer, BartForConditionalGeneration

def generate_summary(document, max_length1):
    # Load pre-trained model and tokenizer
    model = BartForConditionalGeneration.from_pretrained('facebook/bart-large-cnn')
    tokenizer = BartTokenizer.from_pretrained('facebook/bart-large-cnn')

    # Tokenize the input document
    inputs = tokenizer.encode(document, return_tensors='pt', max_length=max_length1, truncation=True)

    # Generate the summary
    summary_ids = model.generate(inputs, num_beams=4, max_length=max_length1, early_stopping=True)

    # Decode the generated summary
    summary = tokenizer.decode(summary_ids.squeeze(), skip_special_tokens=True)

    return summary

# Example usage
#text = "India is an incredible country with an incredibly diverse population. It is home to over 1.3 billion people from various cultural, religious and linguistic backgrounds, making it one of the most populous countries in the world. The country has a rich history, spanning centuries, and its culture is defined by a strong sense of tradition and customs. India is the birthplace of four major religions - Hinduism, Buddhism, Jainism, and Sikhism - and is home to a wide variety of languages, including Hindi, English, Tamil, Sanskrit, and Urdu. India is also a major player in the global economy, producing a significant amount of goods and services for the world market. The country has a strong agricultural sector, and a thriving manufacturing industry. Additionally, India is a major exporter of textiles and apparel, and has a rapidly growing IT sector. Its economy is also bolstered by a vibrant services sector, which includes banking, finance, telecommunications, and tourism. India is a country with immense potential, and its people are eager to take advantage of the opportunities the country has to offer."
numOfWords =int(sys.argv[1])
text = sys.argv[2]
text = text.replace('\t', ' ')

# Remove any extra spaces
text = ' '.join(text.split())
summary = generate_summary(text,numOfWords)
print(summary)