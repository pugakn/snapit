import { Image, ImageSourcePropType } from 'react-native';
import { Modal } from 'react-native-paper';
export default function ({
  selectedImage,
  onExit,
}: {
  selectedImage: ImageSourcePropType | undefined;
  onExit: () => void;
}) {
  return (
    <Modal
      visible={!!selectedImage}
      onDismiss={() => onExit()}
      contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {selectedImage && <Image style={{ width: '90%', height: '90%' }} source={selectedImage} />}
    </Modal>
  );
}
