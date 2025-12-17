import torch
import torch.nn.functional as func
from PIL import Image
import io, time
from collections import OrderedDict
from network.models import TransferModel
from data_transforms import xception_default_data_transforms
class DeepfakeAnalyzer:
    def __init__(self, path:str):
        self.device=torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.transform = xception_default_data_transforms['val']
        model=TransferModel(modelchoice='xception',num_out_classes=2,dropout=0.5)
        state_dict=torch.load(path,map_location=self.device)
        new_state=OrderedDict()
        for k,v in state_dict.items():
            name=k[7:] if str(k).startswith('module.') else k
            new_state[name]=v
        model.load_state_dict(new_state)
        model.to(self.device)
        model.eval()
        self.model=model
    def predict(self, image_by: bytes)->float:
        start=time.time()
        image=Image.open(io.BytesIO(image_by)).convert('RGB')
        input_tensor=self.transform(image)
        input_batch=input_tensor.unsqueeze(0).to(self.device)
        with torch.no_grad():
            output=self.model(input_batch)
        probs=func.softmax(output,dim=1)
        fake_prob=probs.cpu().numpy()[0,1]
        print(f'Interface Took: {time.time()-start:.2f} seconds.')
        return float(fake_prob)